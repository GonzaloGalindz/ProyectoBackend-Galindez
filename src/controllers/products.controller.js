import { productsService } from "../services/products.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productsService.findProducts();
    res.status(200).json({ message: "Products", response: products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsService.findById(pid);
    res.status(200).json({ message: "Product By Id", response: product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productsService.createProduct(req.body);
    res
      .status(200)
      .json({ message: "New product created", response: newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const updatedProduct = await productsService.updateProduct(pid, req.body);
    res
      .status(200)
      .json({ message: "Product updated", response: updatedProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productsService.deleteProduct(pid);
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
