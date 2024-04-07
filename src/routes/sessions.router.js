import { Router } from "express";
import { usersManagerMongo } from "../dao/managers/MongoDB/userManagerMongo.js";
import { hashData, compareData } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = await usersManagerMongo.findUser({ email });
  if (userDB) {
    return res.status(400).json({ message: "Email already used" });
  }
  const hashPassword = await hashData(password);
  const newUser = await usersManagerMongo.createUser({
    ...req.body,
    password: hashPassword,
  });
  res.status(200).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  const userDB = await usersManagerMongo.findUser({ email });
  if (!userDB) {
    return res.status(400).json({ message: "Signup first" });
  }
  const isPasswordValid = await compareData(password, userDB.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or Password not valid" });
  }

  // req.session.user = userDB;
  req.session.email = email;

  if (userDB.role == "admin") {
    res.redirect("/api/views/realtimeproducts");
  } else {
    res.redirect("/api/views/products");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      return res
        .status(500)
        .send({ status: "Error", error: "Error when closing transfer" });
    }
    res.redirect("/api/views/login");
  });
});

export default router;
