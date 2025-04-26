const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("emailId not valid"+value);
            }
        }
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        //adds a validator function for this property.
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data not valid")
            }
        }
    },
    about:{
        type:String,
        default:"this is default about the user!"

    },
    skills:{
        type:String,
       
    }
    
    
},{
    timestamps:true
}) ;

module.exports = mongoose.model("user",userSchema);


