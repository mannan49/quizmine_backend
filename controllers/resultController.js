const mongoose = require("mongoose");
const AddMcqs = require("../models/admin/addMcqsModel");
const UserResults = require("../models/userResultsModel");
const helpers = require("../helpers/helper");

exports.resultController = async (req, res) => {
  const data = req.body;

  // Check if the request body is present using the helper function
  let value = await helpers.isBodyPresent(data);

  // If the body is not present, send an error response
  if (value === "Content cannot be empty") {
    return res
      .status(400)
      .send({ error_code: -1, message: "Content can not be empty!" });
  }

  try {
    // Count correct, incorrect, and unattempted answers
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unattempted = 0;

    // Retrieve all MCQs from the database
    const mcqs = await AddMcqs.find();

    // Iterate through user's answers to evaluate results
    for (const userMcq of data.mcqs) {
      const mcq = mcqs.find(
        (dbMcq) => dbMcq._id.toString() === userMcq.id.toString()
      );

      if (!mcq) {
        unattempted++;
      } else if (mcq.correct_option === userMcq.correct_option) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    }

    // Find the associated skill_id based on a user's answer
    const skillIdFromMCQ = mcqs.length > 0 ? mcqs[0].chapter.id : null;

    // Create an object to store user's test result data
    const resultData = {
      result: correctAnswers,
      skill_id: skillIdFromMCQ, // Use the skill ID associated with the user's answers
      total_score: data.mcqs.length,
    };

    // Create a new entry for the user's test result in the database
    UserResults.create(resultData)
      .then(() => {
        res.send({
          error_code: 0,
          data: {
            valid_answers: correctAnswers,
            invalid_answers: incorrectAnswers,
            unattempted: unattempted,
            total: data.totalLength,
          },
          message: "Result saved",
        });
      })
      .catch((err) => {
        res.send({ error_code: -1, message: err.message });
      });
  } catch (error) {
    res.json({ error_code: -1, message: "Invalid Action" });
  }
};
