import { cartsModel } from "../../models/carts.model.js";

class CartsMongo {
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
      const cart = await cartsModel.findById(cid);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newCart = await cartsModel.create(obj);
      return newCart;
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

  async deleteOne(cid) {
    try {
      const deletedCart = await cartsModel.findByIdAndDelete(cid);
      return deletedCart;
    } catch (error) {
      return error;
    }
  }
}

export const cartsManagerMongo = new CartsMongo();
