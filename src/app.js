import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import config from "./config.js";
import "./DAL/MongoDB/dbConfig.js";
import "./config/passport.config.js";

import { productsManagerMongo } from "./DAL/dao/MongoDao/products.dao.js";
import { chatManagerMongo } from "./DAL/dao/MongoDao/chat.dao.js";

// Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//cookies
app.use(cookieParser("SecretKeyCookies"));

//sessions
app.use(
  session({
    store: new MongoStore({
      mongoUrl: config.MONGO_URI,
      ttl: 60,
    }),
    secret: config.SESSIONSECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);
app.use("/api/sessions", sessionsRouter);

const httpServer = app.listen(config.PORT, () => {
  console.log(`Listening express server on port ${config.PORT}`);
});

const socketServer = new Server(httpServer);

const messages = [];

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  //CHAT
  socket.on("mensaje", async (infoMensaje) => {
    const newMessage = await chatManagerMongo.createOne(infoMensaje);
    const message = await chatManagerMongo.findAll();
    messages.push(newMessage);
    socketServer.emit("chat", message);
  });

  socket.on("usuarioNuevo", (usuario) => {
    socket.broadcast.emit("broadcast", usuario);
  });

  //FORM PRODUCTS
  socket.on("agregar", async (objProd) => {
    const opAdd = await productsManagerMongo.createOne(objProd);
    const allProducts = await productsManagerMongo.findAll();
    if (opAdd) {
      socketServer.emit("added", allProducts);
    } else {
      socket.emit("added", allProducts);
    }
  });

  socket.on("eliminar", async (_id) => {
    const opDel = await productsManagerMongo.deleteOne(_id);
    const updatedProducts = await productsManagerMongo.findAll();
    if (opDel) {
      socketServer.emit("deleted", updatedProducts);
    } else {
      socket.emit("deleted", updatedProducts);
    }
  });
});
