require("../db/mongoose");
const User = require("../models/user");

const postUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    const createStudent = await user.save();


    res.send({ createStudent,token });
  } catch (error) {
    res.send("Invalid email");
  }
};


module.exports = postUser;
