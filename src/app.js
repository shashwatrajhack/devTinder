const express = require("express");

const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

// app.use("/",(req,res)=>{
//     res.send("helooo from dashboard")
// });

app.post("/signup",async (req,res)=>{
//creating an instance of user

const user = new User({
    firstName:"krishna",
    lastName:"raj",
    emailId:"krishna@gmail.com",
    password:"krishna@1234"
});

try{
    await user.save();
res.send("user added successfully")
}catch(err){
    res.status(400).send("error saving the user:" + err.message)
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

