const router = require("express").Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  registerStaff,
  getUser,
  getUserID,
  deleteUser,
  updateUser,
} = require("../../controllers/auth/auth");

//bellow routes map the controllers
router.route("/register").post(register); // call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/passwordreset/:resetToken").put(resetpassword);

router.route("/registerStaff").post(registerStaff);

router.route("/getUser").get(getUser);

router.route("/getUserID/:id").get(getUserID);

router.route("/deleteUser/:id").delete(deleteUser);

router.route("/updateUser/:id").put(updateUser);

module.exports = router;