const mongoose = require("mongoose");
const { isLowercase } = require("validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
    max: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercaase: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    lowercase:true,
    //custom validation
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender is not valid");
      }
    },
  },
  about: {
    type: String,
    default: "This is default info of user",
  },
  photoURL: {
    type: String,
    default: "this is default photo url",
  },
},{
  timestamps:true,
},);

const User = mongoose.model("User", userSchema);

module.exports = User;
