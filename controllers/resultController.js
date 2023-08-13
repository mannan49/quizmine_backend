const mongoose = require("mongoose");
const AddMcqs = require("../models/admin/addMcqsModel"); // Import the Mongoose model for MCQs
const UserResults = require("../models/userResultsModel"); // Import the Mongoose model for User Results
const helpers = require("../helpers/helper"); // Import the helpers module

// Controller function to handle saving user test result
exports.result = async (req, res) => {
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
    // Retrieve all MCQs from the database
    const mcqs = await AddMcqs.find();

    // Filter user's answers to get only the correct ones
    const correct_ans = data.mcqs.filter((userMcq) => {
      const mcq = mcqs.find(
        (dbMcq) => dbMcq._id.toString() === userMcq.id.toString()
      );
      return mcq && mcq.correct_option === userMcq.correct_option;
    });

    // Create an object to store user's test result data
    const resultData = {
      result: correct_ans.length, // Number of correct answers
      skill_id: mongoose.Types.ObjectId("your_skill_id"), // Replace with the appropriate skill ID
      total_score: data.mcqs.length, // Total number of questions in the test
      user_id: data.user_id, // User's ID
    };

    // Create a new entry for the user's test result in the database
    UserResults.create(resultData)
      .then(() => {
        res.send({
          error_code: 0,
          data: {
            valid_answers: correct_ans.length, // Number of correct answers
            invalid_answers: data.mcqs.length - correct_ans.length, // Number of incorrect answers
            total: data.mcqs.length, // Total number of questions in the test
          },
          message: "Result saved",
        });
      })
      .catch((err) => {
        if (err) {
          res.send({ error_code: -1, message: err.message });
        } else {
          res.status(500).send({
            error_code: -1,
            message:
              err.message || "Some error occurred while creating the User.",
          });
        }
      });
  } catch (error) {
    res.json({ error_code: -1, message: "Invalid Action" });
  }
};
