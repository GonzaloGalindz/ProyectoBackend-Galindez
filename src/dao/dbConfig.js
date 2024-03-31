import mongoose from "mongoose";

const uri =
  "mongodb+srv://gonzagalin777:e6fcvUQkvu8zSVy1@cluster0.uonwr28.mongodb.net/ecommerce53110DB?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));
