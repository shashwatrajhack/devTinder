const express = require('express');

const app = express();

app.use("/",(req,res) =>{
  res.send("hhhhhhhhhhhhhhellllo")
});

app.use("/test",(req,res) =>{
  res.send("hhhhhhhhhhhhhhellllo from test")
});

app.use("/happy",(req,res) =>{
  res.send("hi from happy")
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});