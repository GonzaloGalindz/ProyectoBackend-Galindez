import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
