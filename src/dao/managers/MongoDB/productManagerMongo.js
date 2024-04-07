import { productsModel } from "../../models/products.model.js";

class ProductsMongo {
  async findProducts() {
    try {
      const products = await productsModel.find({}).lean();
      return products;
    } catch (error) {
      return error;
    }
  }

  async findAll(obj) {
    const { limit = 10, page = 1, ...query } = obj;
    try {
      const result = await productsModel.paginate(query, {
        limit,
        page,
      });
      const info = {
        status: "Success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: `http://localhost:8080/api/products?page=${result.prevPage}`,
        nextLink: `http://localhost:8080/api/products?page=${result.nextPage}`,
      };
      return { info };
    } catch (error) {
      return error.message;
    }
  }

  async findById(pid) {
    try {
      const product = await productsModel.findById(pid).lean();
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
