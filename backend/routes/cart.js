const router = require("express").Router();

const {
  createCart,
  getCart,
  deleteCart,
  deleteCartItems,
} = require("../controllers/cart");

router.route("/createCart").post(createCart);
router.route("/getCart").get(getCart);
router.route("/deleteCart/:id").delete(deleteCart);
router.route("/delete").delete(deleteCartItems);

module.exports = router;
