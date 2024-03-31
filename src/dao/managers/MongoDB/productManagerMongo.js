import { productsModel } from "../../models/products.model.js";

class ProductsMongo {
  async findAll() {
    try {
      const products = await productsModel.find({});
      return products;
    } catch (error) {
      return error;
    }
  }

  async findById(pid) {
    try {
      const product = await productsModel.findById(pid);
      return product;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newProduct = await productsModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async updateOne(pid, obj) {
    try {
      const updatedProduct = await productsModel.updateOne(
        { _id: pid },
        { ...obj }
      );
      return updatedProduct;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(pid) {
    try {
      const deletedProduct = await productsModel.findByIdAndDelete(pid);
      return deletedProduct;
    } catch (error) {
      return error;
    }
  }
}

export const productsManagerMongo = new ProductsMongo();
