const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.send("User created successfully");
  } catch (e) {
    res.status(400).send("error saving the user" + e);
  }
});

app.get("/user",async(req,res) => {
  const userEmail = req.body.email;

  try{
    const users = await User.find({emailId:userEmail});
    if(users.length === 0){
      return res.status(404).send("user not found");
    }else{
      res.send(users);
    }
  }catch(error){
    res.status(400).send("something went wrong");
  }
});

app.get("/feed",async(req,res) =>{
  try{
    const users = await User.find({});
    res.find(users);

  }catch(error){
    res.status(400).send("something went wrong");

  }

})

app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;

  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  }catch(error){
    res.status(400).send("something went wrong");
  }
})

app.patch("/user/:userId",async(req,res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try{
    const ALLOWED_UPDATES = ["about","gender","age","skills"];
    const isUpdateAllowed = Object.keys(data).every((k) = ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
      throw new Error("update not allowed");
    }
    if(data?.skills.length >10){
      throw new Error("update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId,data,{
      returnDocument:"after",
      runValidators:true,
    });
    console.log(user);
    res.send("user updated successfully");
  }catch(error){
    res.status(400).send("something went wrong");
  }


})

connectDb()
  .then(() => {
    console.log("Connection established successfully");
    app.listen(7777, () => {
      console.log("server is successfully running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Connection not established successfully");
  });
