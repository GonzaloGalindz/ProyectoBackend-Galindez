import { Router } from "express";
import { productsManagerMongo } from "../dao/managers/MongoDB/productManagerMongo.js";
import { cartsManagerMongo } from "../dao/managers/MongoDB/cartManagerMongo.js";
// import productsManager from "../dao/managers/Filesystem/ProductManager.js";

const router = Router();

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/products", async (req, res) => {
  const products = await productsManagerMongo.findProducts();
  // let user = req.session.user;
  //res.render("products", { products: products, user: user });
  res.render("products", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsManagerMongo.findProducts();
  // let user = req.session.user;
  //res.render("products", { products: products, user: user });
  res.render("realTimeProducts", { products });
});

router.get("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManagerMongo.findById(pid);
    if (!product) {
      res.status(400).json({ msg: "Product not found" });
    }
    res.render("viewProduct", { product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManagerMongo.findById(cid);
    if (!cart) {
      res.status(400).json({ msg: "Cart not found" });
    }
    res.render("cart", { products: cart.products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
