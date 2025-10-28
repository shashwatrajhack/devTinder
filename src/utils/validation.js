const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};

const validateLoginData =(req) => {
    const {emailId,password} = req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid credentials");
    }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ["about","lastName","firstName","photoURL","skills","age","gender","emailId"];

  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

  return isEditAllowed;
}

module.exports = {
  validateSignupData,
  validateLoginData,
  validateEditProfileData
};
