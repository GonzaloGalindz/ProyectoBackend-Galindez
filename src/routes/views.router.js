import { Router } from "express";
import productsManager from "../managers/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsManager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
