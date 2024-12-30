const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || lastName){
        throw new error("give a valid name");
    }else if(!validator.emailId(emailId)){
        throw new error("Give a valid emailId");
    }else if(!validator.isStrongPassword(password)){
        throw new error("password is too weak");
    }
};

module.exports = {
    validateSignUpData,

};