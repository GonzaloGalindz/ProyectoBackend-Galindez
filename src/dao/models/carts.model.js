import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
  },
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
