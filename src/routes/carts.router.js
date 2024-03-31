import { Router } from "express";
import { cartsManagerMongo } from "../dao/managers/MongoDB/cartManagerMongo.js";
// import cartsManager from "../dao/managers/Filesystem/CartManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManagerMongo.findAll();
    if (carts.length) {
      res.status(200).json({ msg: "All carts", carts });
    } else {
      res.status(200).json({ msg: "No Carts found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManagerMongo.findById(cid);
    res.status(200).json({ msg: "Cart", cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { name, products, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ msg: "Some data is missing" });
  }
  try {
    const newCart = await cartsManagerMongo.createOne(req.body);
    res.status(200).json({ msg: "New Cart", newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartUpdated = await cartsManagerMongo.updateOne(cid, req.body);
    res.status(200).json({ msg: "Cart updated", cartUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartsManagerMongo.deleteOne(cid);
    res.status(200).json({ msg: "Cart deleted", deletedCart });
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
