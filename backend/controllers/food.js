const Food = require("../models/food");

exports.createFood = async (req, res) => {
  const { foodCategory, foodName, foodDescription } = req.body;

  const foodPrice = Number(req.body.foodPrice);

  const newFood = new Food({
    foodCategory,
    foodName,
    foodDescription,
    foodPrice,
  });

  await newFood
    .save()
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.getFood = async (req, res) => {
  await Food.find()
    .then((food) => res.json(food))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.getFoodID = async (req, res) => {
  const { id } = req.params;

  await Food.findById(id)
    .then((foods) => res.json(foods))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;

  await Food.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.updateFood = async (req, res) => {
  const { id } = req.params;

  const {
    foodCategory,
    foodName,
    foodDescription,
    foodPrice,
  } = req.body;

  await Food.findByIdAndUpdate(id, {
    foodCategory,
    foodName,
    foodDescription,
    foodPrice,
  })
    .then(() => res.json({ message: "Update Successfully" }))
    .catch((error) => res.json({ success: false, error: error }));
};