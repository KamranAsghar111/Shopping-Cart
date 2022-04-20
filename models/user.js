const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
},
  password: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id:user._id.toString() },
    "secret"
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};




  userSchema.pre('save', async function (next) {
      const user = this
      
      if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 8)
      }
  
      next()
  })
  

const User = new mongoose.model("User", userSchema);
module.exports = User;