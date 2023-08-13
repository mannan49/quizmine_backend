const Skill = require("../../models/admin/addSkillsModel"); // Import the Mongoose model
const helpers = require("../../helpers/helper");

exports.addSkill = async (req, res) => {
  const isBodyPresent = helpers.isBodyPresent(req.body);

  if (isBodyPresent === "Content cannot be empty") {
    return res
      .status(400)
      .send({ error_code: -1, message: "Content can not be empty!" });
  }

  const params = req.body;

  try {
    const existingSkill = await Skill.findOne({
      class: params.class,
      subject: params.subject,
      chapter: params.chapter,
    });

    if (existingSkill) {
      return res.send({ error_code: -1, message: "Skill already exists!" });
    }

    const newSkill = new Skill(params);
    await newSkill.save();

    res.send({ error_code: 0, message: "Skill Successfully added" });
  } catch (error) {
    res.status(500).json({ error_code: -1, message: "Invalid Action" });
  }
};

exports.updateSkill = async (req, res) => {
  const id = req.params.id;
  const params = req.body;

  try {
    const updatedSkill = await Skill.findByIdAndUpdate(id, params);

    if (updatedSkill) {
      res.send({ message: "Skill was updated successfully." });
    } else {
      res.send({
        message: `Cannot update Skill with id=${id}. Maybe Skill was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating Skill with id=" + id });
  }
};

exports.deleteSkill = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (deletedSkill) {
      res.send({ message: "Skill was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Skill with id=${id}. Maybe Skill was not found!`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not delete Skill with id=" + id });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const allSkills = await Skill.find();
    res.send(allSkills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occurred while retrieving Skills." });
  }
};

exports.getSkill = async (req, res) => {
  const id = req.params.id;

  try {
    const skill = await Skill.findById(id);

    if (skill) {
      res.send(skill);
    } else {
      res.status(404).send({ message: `Cannot find Skill with id=${id}.` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Skill with id=" + id });
  }
};
