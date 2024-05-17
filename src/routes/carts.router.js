import { Router } from "express";
import { cartsManagerMongo } from "../DAL/dao/MongoDao/carts.dao.js";
import {
  createCart,
  deleteCart,
  getCartById,
  getCarts,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getCarts);

router.get("/:cid", getCartById);

router.post("/", createCart);

router.delete("/:cid", deleteCart);

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cart = await cartsManagerMongo.addProductToCart(cid, pid);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ msg: "Product added in to cart", response: cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const newQuantity = req.body.quantity;
  try {
    const cart = await cartsManagerMongo.updateProductInCart(
      cid,
      pid,
      newQuantity
    );
    if (!cart) {
      return res.status(400).json({ error: "Cart not found" });
    }
    res.status(200).json({ msg: "Updated product in cart", response: cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartsManagerMongo.deleteProductInCart(cid, pid);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// (NO ME ESTARIA SALIENDO COMO AÑADIR PRODUCTOS AL CARRITO CON MONGO)
// router.post("/:cid/product/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   try {
//     const addProduct = await cartsManager.addProductInCart(+cid, +pid);
//     res
//       .status(200)
//       .json({ msg: "Products in this cart", response: addProduct });
//   } catch (error) {
//     res.status(500).json({ error });
//   }

export default router;
