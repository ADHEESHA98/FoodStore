const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
 
  foodName: {
    type: String,
  },

  foodCategory: {
    type: String,
  },

  foodPrice: {
    type: Number,
  },

  foodDescription: {
    type: String,
  },
});

const newCart = mongoose.model("cart", Cart);

module.exports = newCart;