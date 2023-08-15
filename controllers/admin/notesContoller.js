const Notes = require("../../models/admin/notesModel");

exports.addNotes = async (req, res) => {
  const { className, subject, skill, pdfFileName, githubRepo } = req.body;

  try {
    const existingNotes = await Notes.findOne({
      className,
      subject,
      skill,
      pdfFileName,
      githubRepo,
    });

    if (existingNotes) {
      return res.send({
        error_code: -1,
        message: "Notes already added for this skill!",
      });
    }

    const newNotes = new Notes({
      className,
      subject,
      skill,
      pdfFileName,
      githubRepo,
    });

    await newNotes.save();

    res.send({ error_code: 0, message: "Notes Successfully added" });
  } catch (error) {
    res.status(500).json({
      error_code: -1,
      message: "An error occurred while adding notes.",
      error: error.message,
    });
  }
};

// Update Notes
exports.updateNotes = async (req, res) => {
  const notesId = req.params.id;
  const { className, subject, skill, pdfFileName, githubRepo } = req.body;

  try {
    const updatedNotes = await Notes.findByIdAndUpdate(notesId, {
      className,
      subject,
      skill,
      pdfFileName,
      githubRepo,
    });

    if (updatedNotes) {
      res.send({ error_code: 0, message: "Notes updated successfully." });
    } else {
      res.send({ error_code: -1, message: "Notes not found." });
    }
  } catch (error) {
    res.status(500).json({
      error_code: -1,
      message: "An error occurred while updating notes.",
      error: error.message,
    });
  }
};

// Delete Notes
exports.deleteNotes = async (req, res) => {
  const notesId = req.params.id;

  try {
    const deletedNotes = await Notes.findByIdAndDelete(notesId);

    if (deletedNotes) {
      res.send({ error_code: 0, message: "Notes deleted successfully." });
    } else {
      res.send({ error_code: -1, message: "Notes not found." });
    }
  } catch (error) {
    res.status(500).json({
      error_code: -1,
      message: "An error occurred while deleting notes.",
      error: error.message,
    });
  }
};

//   Get Single Notes
exports.getSingleNotes = async (req, res) => {
  const notesId = req.params.id;

  try {
    const notes = await Notes.findById(notesId);

    if (notes) {
      res.send({ error_code: 0, data: notes });
    } else {
      res.send({ error_code: -1, message: "Notes not found." });
    }
  } catch (error) {
    res.status(500).json({
      error_code: -1,
      message: "An error occurred while retrieving notes.",
      error: error.message,
    });
  }
};

// Get All Notes
exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await Notes.find();

    res.send({ error_code: 0, data: allNotes });
  } catch (error) {
    res.status(500).json({
      error_code: -1,
      message: "An error occurred while retrieving all notes.",
      error: error.message,
    });
  }
};
