import { Router } from "express";
import { cartsManagerMongo } from "../dao/managers/MongoDB/cartManagerMongo.js";
// import cartsManager from "../dao/managers/Filesystem/CartManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManagerMongo.findAll();
    res.status(200).json({ msg: "All carts", response: carts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManagerMongo.findById(cid);
    res.status(200).json({ msg: "Cart by Id", response: cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartsManagerMongo.createOne();
    res.status(200).json({ msg: "New Cart", response: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;
  try {
    const cart = await cartsManagerMongo.addProductToCart(cid, pid, quantity);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ msg: "Product added in to cart", response: cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartUpdated = await cartsManagerMongo.updateOne(cid, req.body);
    res.status(200).json({ msg: "Cart updated", response: cartUpdated });
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
    console.log(error.message);
    // res.status(500).json({ error });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartsManagerMongo.deleteOne(cid);
    res.status(200).json({ msg: "Cart deleted" });
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

//FileSystem

// router.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const cart = await cartsManager.getCart(+cid);
//     res.status(200).json({ msg: "Cart", response: cart });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newCart = await cartsManager.createCart();
//     res.status(200).json({ msg: "New Cart", response: newCart });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

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
// });

export default router;
