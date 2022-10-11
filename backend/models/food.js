const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Food = new Schema({
  foodCategory: {
    type: String,
  },

  foodName: {
    type: String,
  },

  foodPrice: {
    type: Number,
  },

  foodDescription: {
    type: String,
  },
});

const newFood = mongoose.model("food", Food);

module.exports = newFood;
