const express = require("express");

const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// app.use("/",(req,res)=>{
//     res.send("helooo from dashboard")
// });

app.post("/signup",async (req,res)=>{
//creating an instance of user model

const user = new User(req.body);

try{
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

