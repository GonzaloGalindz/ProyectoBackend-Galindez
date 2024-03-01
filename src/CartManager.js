import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const arrayCarts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(arrayCarts);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getCart(id) {
    try {
      const arrayCarts = await this.getCarts();
      const oneCart = arrayCarts.find((c) => c.id === id);
      return oneCart;
    } catch (error) {
      return error;
    }
  }

  async createCart() {
    try {
      const arrayCarts = await this.getCarts();
      let id;
      if (!arrayCarts.length) {
        id = 1;
      } else {
        id = arrayCarts[arrayCarts.length - 1].id + 1;
      }
      const newCart = { products: [], id };
      arrayCarts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(arrayCarts));
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async addProductInCart(cid, pid) {
    try {
      const arrayCarts = await this.getCarts();
      const oneCartManager = arrayCarts.find((c) => c.id === cid);
      const cartIndex = oneCartManager.products.findIndex((p) => p.id === pid);
      if (cartIndex === -1) {
        oneCartManager.products.push({ id: pid, quantity: 1 });
      } else {
        oneCartManager.products[cartIndex].quantity++;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(arrayCarts));
      return oneCartManager;
    } catch (error) {
      return error;
    }
  }
}

const cartsManager = new CartManager("./Carrito.json");
export default cartsManager;

// async function managerCart() {
//   const cartManager = new CartManager("./Carrito.json");
//   await cartManager.createCart();
//   // await cartManager.addProductInCart(1, 5);
//   // await cartManager.addProductInCart(1, 5);
//   // await cartManager.addProductInCart(1, 3);
//   const cartById = await cartManager.getCart(2);
//   console.log(cartById);
// }

// managerCart();
