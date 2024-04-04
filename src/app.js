import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import "./dao/dbConfig.js";

import { productsManagerMongo } from "./dao/managers/MongoDB/productManagerMongo.js";
import { chatManagerMongo } from "./dao/managers/MongoDB/chatManagerMongo.js";
// import productsManager from "./dao/managers/Filesystem/ProductManager.js";

// Routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Listening express server on port 8080");
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
