const mongoose = require("mongoose");
const validator = require("validator");

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
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("email address not valid "+value);
      }
    }
  },
  password: {
    type: String,
     validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a strong password"+value);
      }
    }
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
     validate(value){
      if(!validator.isURL(value)){
        throw new Error("URL address not valid "+value);
      }
    }
  },
  skills:{
    type:[String],
  }
},{
  timestamps:true,
},);

const User = mongoose.model("User", userSchema);

module.exports = User;
