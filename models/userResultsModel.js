const mongoose = require("mongoose");

const userResultsSchema = new mongoose.Schema({
  result: {
    type: String,
    required: true,
  },
  skill_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Skill model
    ref: "AddSkill",
    required: true,
  },
  total_score: {
    type: String,
    required: true,
  },
});

const UserResults = mongoose.model("UserResults", userResultsSchema);

module.exports = UserResults;
