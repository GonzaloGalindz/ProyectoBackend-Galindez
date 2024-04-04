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
      const cart = await cartsModel.findById(cid).populate("Products");
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createOne() {
    const newCart = await cartsModel.create({
      products: [],
    });
    try {
      const savedCart = await this.saveCart(newCart);
      return savedCart;
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    const cart = await cartsModel.findById(cid);
    const existingProduct = cart.products.find((p) => p.product.equals(pid));
    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({ product: pid, quantity: quantity || 1 });
    }
    try {
      await this.saveCart(cart);
    } catch (error) {
      return error;
    }
    return cart;
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
    const cart = await cartsModel.findById(cid);
    const product = cart.products.find((p) => p.id == pid);
    if (product) {
      product.quantity = newQuantity;
    }
    try {
      await this.saveCart(cart);
    } catch (error) {
      return error;
    }
    return cart;
  }

  async deleteOne(cid) {
    try {
      const deletedCart = await cartsModel.findByIdAndDelete(cid);
      return deletedCart;
    } catch (error) {
      return error;
    }
  }

  async deleteProductInCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) throw new Error("Cart not found");
      const deleteProd = await cartsModel.updateOne(
        { _id: cid },
        { $pull: { products: pid } }
      );
      return deleteProd;
    } catch (error) {
      return error;
    }
  }
}

export const cartsManagerMongo = new CartsMongo();
