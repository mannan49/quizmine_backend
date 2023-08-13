const mongoose = require("mongoose");

const addSkillsSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
});

const AddSkill = mongoose.model("AddSkill", addSkillsSchema);

module.exports = AddSkill;
