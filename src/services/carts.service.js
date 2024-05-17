import { cartsManagerMongo } from "../DAL/dao/MongoDao/carts.dao.js";

class CartsService {
  constructor() {}

  async findAll() {
    const carts = await cartsManagerMongo.findAll();
    return carts;
  }

  async findById(cid) {
    const cart = await cartsManagerMongo.findById(cid);
    return cart;
  }

  async createCart() {
    const newCart = await cartsManagerMongo.createOne();
    return newCart;
  }

  async deleteCart(cid) {
    const deletedCart = await cartsManagerMongo.deleteCart(cid);
    return deletedCart;
  }
}

export const cartsService = new CartsService();
