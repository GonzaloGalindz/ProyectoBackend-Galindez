import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const arrayProducts = await fs.promises.readFile(this.path, "utf-8");
        if (arrayProducts.length === 0) {
        }
        return JSON.parse(arrayProducts);
      } else {
        return [];
      }
    } catch (error) {
      console.log("Error reading file: ", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const productsAll = await this.getProducts();
      const product = productsAll.find((prod) => prod.id === id);
      if (!product) {
        return "There is no product with this id";
      }
      return product;
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock
      ) {
        console.log("Please complete all required fields");
        return;
      }
      const productsAll = await this.getProducts();
      const productAdd = productsAll.find((prod) => prod.code === product.code);
      if (productAdd) {
        console.log("There is already a product with this code");
        return;
      }

      let id;
      if (!productsAll.length) {
        id = 1;
      } else {
        id = productsAll[productsAll.length - 1].id + 1;
      }
      productsAll.push({ ...product, id });
      await fs.promises.writeFile(this.path, JSON.stringify(productsAll));
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, product) {
    try {
      const productsAll = await this.getProducts();
      const indexProd = productsAll.findIndex((prod) => prod.id === id);
      if (indexProd === -1) {
        return "There is no product with this id";
      }
      const prodUpdate = productsAll[indexProd];
      productsAll[indexProd] = { ...prodUpdate, ...product };
      await fs.promises.writeFile(this.path, JSON.stringify(productsAll));
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const productsAll = await this.getProducts();
      const newArrayProd = productsAll.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProd));
    } catch (error) {
      return error;
    }
  }
}

const productsManager = new ProductManager("./Products.json");
export default productsManager;
