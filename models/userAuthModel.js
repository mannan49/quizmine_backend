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
  class: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: String,
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema);

module.exports = UserAuth;
