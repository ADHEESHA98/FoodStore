const router = require("express").Router();

const {
  createFood,
  getFood,
  getFoodID,
  deleteFood,
  updateFood,
} = require("../controllers/food");

router.route("/createFood").post(createFood);

router.route("/getFood").get(getFood);

router.route("/getFoodID/:id").get(getFoodID);

router.route("/deleteFood/:id").delete(deleteFood);

router.route("/updateFood/:id").put(updateFood);

module.exports = router;