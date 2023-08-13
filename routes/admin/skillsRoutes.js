const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");
const express = require("express");
const router = express.Router();
const {
  addSkill,
  updateSkill,
  deleteSkill,
  getAllSkills,
  getSkill,
} = require("../../controllers/admin/addSkillsController");

// Add skill route
router.post("/addskill", auth, authorization, addSkill);

// Update skill route
router.put("/updateSkill/:id", auth, authorization, updateSkill);

// Delete skill route
router.delete("/deleteSkill/:id", auth, authorization, deleteSkill);

// Get all skills route
router.get("/", auth, getAllSkills);

// Get specific skill route
router.get("/:id", auth, getSkill);

module.exports = router;
