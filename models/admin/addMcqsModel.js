const mongoose = require("mongoose");

const addMcqsSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
    unique: true,
  },
  options: {
    type: String,
    required: true,
  },
  correct_option: {
    type: String,
    required: true,
  },
  chapter: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

const AddMcqs = mongoose.model("AddMcqs", addMcqsSchema);

module.exports = AddMcqs;
