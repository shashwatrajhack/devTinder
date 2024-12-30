const express = require("express");
const bcrypt = require("bcrypt");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");

app.use(express.json());

// app.use("/",(req,res)=>{
//     res.send("helooo from dashboard")
// });

app.post("/signup",async (req,res)=>{


    try{
 //validation of signUp data
    //validateSignUpData(req);
//creating an instance of user model

const {firstName,lastName,emailId,password} = new User(req.body);

const paswordHash = await bcrypt.hash(password,10);

//creating a new instance of the model

const user = new User({
    firstName,
    lastName,
    emailId,
    password:paswordHash,
})
    await user.save();
res.send("user added successfully")
}catch(err){
    res.status(400).send("error saving the user:" + err.message)
}
})

//get user by email
app.get("/user",async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        console.log(userEmail);
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            res.status(400).send("user not found")
        }else{
            res.send(user);
        }

    }catch(err){
        res.status(400).send("something went wrong");
    }
})
//feed api 
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);

    }catch(err){
        res.status(400).send("something went wrong");
    }
})

app.patch("/update",async(req,res)=>{
    const userId = req.body.userId;
    const data = req.body;

    try{

        const ALLOWED_UPDATES = [
            "about",
            "gender",
            "age",
            "skills"
        ];
        const isUpdateAllowed = Object.keys(data).every((k) =>{
            ALLOWED_UPDATES.includes(k)
        });
        if(!isUpdateAllowed){
            throw new error("update not allowed");
        }
        if(data?.skills.length>10){
            throw new error("skills more than 10 not allowed")
        }
        const user = await User.findByIdAndUpdate(userId);
        res.send("user Updated successfully");

    }catch(err){
        res.status(400).send("something went wrong");
    }

})

connectDb().then(() => {
    console.log("Connection established successfully");
    app.listen(7777,()=>{
        console.log("server is successfully running on port 7777")
    });
})
.catch((err) =>{
     console.error("Connection not established successfully");

})

