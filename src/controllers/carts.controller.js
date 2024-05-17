import { cartsService } from "../services/carts.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.findAll();
    res.status(200).json({ message: "Carts", response: carts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsService.findById(cid);
    res.status(200).json({ message: "Cart By Id", response: cart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await cartsService.createCart();
    res.status(200).json({ message: "New cart created", response: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartsService.deleteCart(cid);
    res.status(200).json({ message: "Cart removed" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
