const {
  addNotes,
  updateNotes,
  deleteNotes,
  getAllNotes,
  getSingleNotes,
} = require("../../controllers/admin/notesContoller");
const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");
const express = require("express");
const router = express.Router();

// Add notes route
router.post("/addNotes", auth, authorization, addNotes);

// Update notes route
router.put("/updateNotes/:id", auth, authorization, updateNotes);

// Delete notes route
router.delete("/deleteNotes/:id", auth, authorization, deleteNotes);

// Get all notes route
router.get("/", getAllNotes);

// Get specific single notes route
router.get("/:id", getSingleNotes);

module.exports = router;
