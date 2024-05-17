import { cartsModel } from "../../MongoDB/models/carts.model.js";

class CartsMongo {
  constructor() {}

  async saveCart(cart) {
    await cart.save();
    return cart;
  }

  async findAll() {
    const carts = await cartsModel.find().lean();
    return carts;
  }

  async findById(cid) {
    const cart = await cartsModel
      .findById(cid)
      .populate("products", [
        "title",
        "price",
        "description",
        "code",
        "stock",
        "quantity",
      ])
      .lean();
    return cart;
  }

  async createOne(initialCart = []) {
    const newCart = await cartsModel.create({
      products: initialCart,
    });
    const savedCart = await this.saveCart(newCart);
    return savedCart;
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

  async deleteCart(cid) {
    const cart = await cartsModel.findByIdAndDelete(cid);
    if (!cart) throw new Error("Cart not found");
    return cart;
  }
}

export const cartsManagerMongo = new CartsMongo();
