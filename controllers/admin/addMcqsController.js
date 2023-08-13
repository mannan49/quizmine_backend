const Mcqs = require("../../models/admin/addMcqsModel"); // Import the Mongoose model
const helpers = require("../../helpers/helper");

exports.addMcqs = async (req, res) => {
  const isBodyPresent = helpers.isBodyPresent(req.body);

  if (isBodyPresent === "Content cannot be empty") {
    return res
      .status(400)
      .send({ error_code: -1, message: "Content can not be empty!" });
  }

  const data = req.body;
  data.options = JSON.stringify(data.options);

  try {
    if (!data.chapter || !data.chapter.id || !data.chapter.name) {
      return res.send({
        error_code: -1,
        message: "Chapter details are missing!",
      });
    }

    const newMcq = new Mcqs(data);
    await newMcq.save();

    res.send({ error_code: 0, message: "MCQ Successfully added" });
  } catch (error) {
    console.error("Error adding MCQ:", error);
    res.status(500).json({ error_code: -1, message: "Error adding MCQ" });
  }
};

exports.updateMcqs = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const data_final = {
    statement: data.statement,
    options: JSON.stringify(data.options),
    correct_option: data.correct_option,
    chapter: { id: data.chapter.id, name: data.chapter.name },
  };

  try {
    const updatedMcq = await Mcqs.findByIdAndUpdate(id, data_final);

    if (updatedMcq) {
      res.send({ error_code: 0, message: "MCQ has updated successfully." });
    } else {
      res.send({
        message: `Cannot update MCQ with id=${id}. Maybe MCQ was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    console.error("Error updating MCQ:", error);
    res.status(500).json({ message: "Error updating MCQ with id=" + id });
  }
};

exports.deleteMcq = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedMcq = await Mcqs.findByIdAndDelete(id);

    if (deletedMcq) {
      res.send({
        error_code: 0,
        message: "MCQ has been deleted successfully.",
      });
    } else {
      res.send({
        message: `Cannot delete MCQ with id=${id}. Maybe MCQ was not found!`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not delete MCQ with id=" + id });
  }
};

exports.getAllMcqs = async (req, res) => {
  try {
    const allMcqs = await Mcqs.find();
    res.send(allMcqs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occurred while retrieving MCQs." });
  }
};

exports.getMcq = async (req, res) => {
  const id = req.params.id;

  try {
    const mcq = await Mcqs.findById(id);

    if (mcq) {
      res.send(mcq);
    } else {
      res.status(404).send({ message: `Cannot find MCQ with id=${id}.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MCQ with id=" + id });
  }
};
