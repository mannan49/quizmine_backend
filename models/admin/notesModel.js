const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  pdfFileName: {
    type: String,
    required: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
