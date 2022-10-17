const Cart = require("../models/cart");

exports.createCart = async (req, res) => {
  const { foodName, foodCategory, foodDescription } = req.body;

  const foodPrice = Number(req.body.foodPrice);

  const newCart = new Cart({
    foodName,
    foodCategory,
    foodDescription,
    foodPrice,
  });

  await newCart
    .save()
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.getCart = async (req, res) => {
  await Cart.find()
    .then((cart) => res.json(cart))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;

  await Cart.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.deleteCartItems = async (req, res) => {
  await Cart.deleteMany({})
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};
