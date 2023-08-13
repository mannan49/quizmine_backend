const UserAuth = require("../../models/userAuthModel");

exports.getUsersData = async (req, res) => {
  try {
    const userData = await UserAuth.find();

    res.send({ error_code: 0, data: userData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occurred while retrieving user data." });
  }
};

exports.getUserData = async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await UserAuth.findById(id);

    if (userData) {
      res.send(userData);
    } else {
      res.status(404).send({ message: `Cannot find User Data with id=${id}.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving User Data with id=" + id });
  }
};
