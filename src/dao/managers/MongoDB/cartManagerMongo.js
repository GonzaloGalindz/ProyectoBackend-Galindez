import { cartsModel } from "../../models/carts.model.js";

class CartsMongo {
  async saveCart(cart) {
    try {
      await cart.save();
      return cart;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const carts = await cartsModel.find({});
      return carts;
    } catch (error) {
      return error;
    }
  }

  async findById(cid) {
    try {
      const cart = await cartsModel
        .findById(cid)
        .populate("products", ["title", "price", "code", "quantity"]);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createOne(initialCart = []) {
    const newCart = await cartsModel.create({
      products: initialCart,
    });
    try {
      const savedCart = await this.saveCart(newCart);
      return savedCart;
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const existingProduct = cart.products.find((p) => p.pid.equals(pid));
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ pid, quantity: 1 });
      }
      await this.saveCart(cart);
      return cart.products.find((p) => p.pid.equals(pid));
    } catch (error) {
      return error;
    }
  }

  async updateOne(cid, obj) {
    try {
      const updatedCart = await cartsModel.updateOne({ _id: cid }, { ...obj });
      return updatedCart;
    } catch (error) {
      return error;
    }
  }

  async updateProductInCart(cid, pid, newQuantity) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const product = cart.products.find((p) => p.pid.equals(pid));
      if (!product) {
        throw new Error("Product not found in this cart");
      }
      product.quantity = newQuantity;
      await this.saveCart(cart);
      return cart;
    } catch (error) {
      return error;
    }
    return cart;
  }

  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) throw new Error("Cart not found");
      cart.products = cart.products.filter((p) => !p.pid.equals(pid));
      await this.saveCart(cart);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async deleteAllProducts(cid) {
    try {
      const cart = await cartsModel.findByIdAndDelete(cid);
      if (!cart) throw new Error("Cart not found");
      cart.products = [];
      await this.saveCart(cart);
      return cart;
    } catch (error) {
      return error;
    }
  }
}

export const cartsManagerMongo = new CartsMongo();
