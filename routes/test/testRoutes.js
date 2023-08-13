const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();

const { setupTest } = require("../../controllers/testController");
const { result } = require("../../controllers/resultController");

// Setup test route
router.get("/setuptest", auth, setupTest);

// Return result route
router.post("/returnresult", result);

module.exports = router;
