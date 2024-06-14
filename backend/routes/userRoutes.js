const express = require("express");
const router = express.Router();
//authentication middleware
const authmiddleware = require("../middleware/authmiddleware");

//userControllers
const { register, login, checkUser, getuser } = require("../controller/userController");

// Register user
router.post("/register", register);

//get user
// router.get("/getregister", getregister)
// Login user
router.post("/login", login);
// get user
router.get("/getuser",getuser);
// Check user
router.get("/check", authmiddleware, checkUser);

// //question 
// router.post("/question");

module.exports = router;
