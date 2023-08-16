const mongoose = require("mongoose");
const AddMcqs = require("../models/admin/addMcqsModel");
const helpers = require("../helpers/helper");

exports.generateTest = async (req, res) => {
  try {
    const data = req.body;

    // Validate if skill_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(data.skill_id)) {
      return res.send({ error_code: -1, message: "Invalid skill_id format" });
    }

    // Convert the skill_id string to ObjectId
    const skillObjectId = new mongoose.Types.ObjectId(data.skill_id);

    // Use aggregation to fetch random MCQs based on chapter.id and number_of_mcqs
    const mcqs = await AddMcqs.aggregate([
      { $match: { "chapter.id": skillObjectId } },
      { $sample: { size: parseInt(data.number_of_mcqs) } },
      { $project: { id: "$_id", statement: 1, options: 1, chapter: 1 } },
    ]);

    // Check if enough MCQs were fetched based on the requested number_of_mcqs
    if (mcqs.length < parseInt(data.number_of_mcqs)) {
      return res.send({
        error_code: -1,
        message: "Sorry, We Don't Have Not enough MCQs Available",
      });
    } else {
      return res.send({
        error_code: 0,
        data: mcqs,
        message: "Your Test is Ready. Best of Luck!!!",
      });
    }
  } catch (error) {
    console.error("Error in generateTest:", error);
    return res.json({ error_code: -1, message: "An error occurred" });
  }
};
