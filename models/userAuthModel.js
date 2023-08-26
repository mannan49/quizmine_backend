const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Check if password length is at least 8 characters
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
  role: String,
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema);

module.exports = UserAuth;
