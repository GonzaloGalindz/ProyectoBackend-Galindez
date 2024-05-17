import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    password: String,
    cart: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const usersModel = mongoose.model("Users", usersSchema);
