const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorization = require("../middleware/authorization");
const {
  getUsersData,
  getUserData,
} = require("../controllers/admin/usersDataController");

// Get all users data route
router.get("/allUsers", auth, authorization, getUsersData);

// Get specific user data route
router.get("/:id", auth, getUserData);

module.exports = router;
