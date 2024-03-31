import { Router } from "express";
import { productsManagerMongo } from "../dao/managers/MongoDB/productManagerMongo.js";
// import productsManager from "../dao/managers/Filesystem/ProductManager.js";

const router = Router();

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/", async (req, res) => {
  const products = await productsManagerMongo.findAll();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsManagerMongo.findAll();
  res.render("realTimeProducts", { products });
});

//FileSystem

// router.get("/", async (req, res) => {
//   const products = await productsManager.getProducts();
//   res.render("home", { products });
// });

// router.get("/realtimeproducts", async (req, res) => {
//   const products = await productsManager.getProducts();
//   res.render("realTimeProducts", { products });
// });

export default router;
