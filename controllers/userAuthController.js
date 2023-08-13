const UserAuth = require("../models/userAuthModel"); // Import the Mongoose model for user authentication
const bcrypt = require("bcryptjs"); // Library for hashing passwords
const jwt = require("jsonwebtoken"); // Library for JWT authentication
const { SECRET } = require("../config/index"); // Secret key for JWT
const helpers = require("../helpers/helper"); // Import the helpers module

// Controller function for user registration
exports.registerUser = async (req, res) => {
  const isBodyPresent = helpers.isBodyPresent(req.body);

  // Check if the request body is present using the helper function
  if (isBodyPresent === "Content cannot be empty") {
    return res
      .status(400)
      .send({ error_code: -1, message: "Content can not be empty!" });
  }

  try {
    const existingUser = await UserAuth.findOne({ email: req.body.email });

    // Check if the email is already registered
    if (existingUser) {
      return res
        .status(400)
        .send({ error_code: -1, message: "Email Already exists!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user_info = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      class: req.body.class,
    };

    await UserAuth.create(user_info);

    res.send({
      error_code: 0,
      message: "Congratulations! You've successfully signed up",
    });
  } catch (err) {
    res.status(500).send({
      error_code: -1,
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Controller function for user login
exports.loginUser = async (req, res) => {
  const isBodyPresent = helpers.isBodyPresent(req.body);

  // Check if the request body is present using the helper function
  if (isBodyPresent === "Content cannot be empty") {
    return res
      .status(400)
      .send({ error_code: -1, message: "Content can not be empty!" });
  }

  try {
    const user = await UserAuth.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ error: "Sorry! There is no registered user with this email" });
    }

    // Compare the provided password with the hashed password in the database
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Create a JWT token for authentication
      const token = jwt.sign(
        {
          id: user._id, // Use "_id" for MongoDB's generated unique identifier
          role: user.role,
        },
        SECRET
      );
      return res.json({
        error_code: 0,
        message: "Congratulations! User Successfully Logged in",
        data: {
          token: token,
          first_name: user.first_name,
          last_name: user.last_name,
          class: user.class,
          user_id: user._id, // Use "_id" for MongoDB's generated unique identifier
        },
      });
    } else {
      return res
        .status(404)
        .json({ error_code: -1, message: "Invalid username or password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error_code: -1, message: "An error occurred during login" });
  }
};
