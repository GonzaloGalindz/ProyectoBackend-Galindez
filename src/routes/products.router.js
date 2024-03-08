import { Router } from "express";
import productsManager from "../managers/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  try {
    const prods = await productsManager.getProducts();
    const prodLimit = await prods.slice(0, limit);
    if (!limit) {
      res.status(200).json({ msg: "Products", response: prods });
    } else {
      res.status(200).json({ msg: "Limited Products", response: prodLimit });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await productsManager.getProductById(+pid);
    res.status(200).json({ msg: "Product by Id", response: prod });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProd = await productsManager.addProduct(req.body);
    res
      .status(200)
      .json({ message: "Product added successfully", response: newProd });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prodUpdated = await productsManager.updateProduct(+pid, req.body);
    res.status(200).json({ message: "Product upgraded successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProd = await productsManager.deleteProduct(+pid);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
