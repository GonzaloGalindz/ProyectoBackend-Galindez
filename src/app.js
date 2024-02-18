import express from "express";
import productsManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const allProducts = await productsManager.getProducts();
    res.status(200).json({ msg: "Products", allProducts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await productsManager.getProductById(+pid);
    res.status(200).json({ msg: "Product by Id", prod });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("Listening express server on port 8080");
});
