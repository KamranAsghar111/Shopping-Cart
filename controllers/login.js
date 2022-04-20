const User = require("../models/user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findOne({ email });

    let match = await bcrypt.compare(password.toString(), user.password);
    const confirm = user.name === name;
    
    if (match === true && confirm === true) {
      res.send(user);
    } else {
      res.send("Incorrect name or password");
    }
  } catch (error) {
    res.status(400).send("User is not Found");
  }
};
module.exports = login;
