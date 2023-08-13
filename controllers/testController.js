const mongoose = require("mongoose");
const AddMcqs = require("../models/admin/addMcqsModel"); // Import the Mongoose model for MCQs
const helpers = require("../helpers/helper"); // Import the helpers module

// Controller function to set up a test by fetching random MCQs
exports.setupTest = async (req, res) => {
  const data = req.query;

  // Check if the request data is present using the helper function
  const value = await helpers.isBodyPresent(data);

  // If the data is not present, send an error response
  if (value === "Content cannot be empty") {
    return res
      .status(400)
      .send({ error_code: -1, message: "Content can not be empty!" });
  }

  try {
    // Check if the provided skill_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(data.skill_id)) {
      return res.send({ error_code: -1, message: "Skill does not exist!" });
    }

    // Use aggregation to fetch random MCQs based on skill_id and number_of_mcqs
    const mcqs = await AddMcqs.aggregate([
      { $match: { skill_id: mongoose.Types.ObjectId(data.skill_id) } },
      { $sample: { size: parseInt(data.number_of_mcqs) } },
      { $project: { id: "$_id", statement: 1, options: 1, skill_id: 1 } },
    ]);

    // Check if enough MCQs were fetched based on the requested number_of_mcqs
    if (mcqs.length < parseInt(data.number_of_mcqs)) {
      return res.send({ error_code: -1, message: "Enough Mcqs do not exist" });
    } else {
      return res.send({ error_code: 0, data: mcqs, message: "Mcqs Fetched" });
    }
  } catch (error) {
    return res.json({ error_code: -1, message: "Invalid Action" });
  }
};
