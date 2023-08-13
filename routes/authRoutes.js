const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/userAuthController");
const router = express.Router();

// Sign up a new user
router.post("/signup", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
