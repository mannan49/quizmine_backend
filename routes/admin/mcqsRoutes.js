const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");
const express = require("express");
const router = express.Router();

const {
  addMcqs,
  updateMcqs,
  deleteMcq,
  getAllMcqs,
  getMcq,
} = require("../../controllers/admin/addMcqsController");

// Add skill route
router.post("/addmcq", auth, authorization, addMcqs);

// Update mcq route
router.put("/updateMcq/:id", auth, authorization, updateMcqs);

// Delete mcq route
router.delete("/deleteMcq/:id", auth, authorization, deleteMcq);

// Get all mcqs route
router.get("/", auth, authorization, getAllMcqs);

// Get specific mcq route
router.get("/:id", auth, authorization, getMcq);

module.exports = router;
