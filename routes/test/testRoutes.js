const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();

const { generateTest } = require("../../controllers/testController");
const { resultController } = require("../../controllers/resultController");

// Setup test route
router.post("/generate-test", generateTest);

// Return result route
router.post("/returnresult", resultController);

module.exports = router;
