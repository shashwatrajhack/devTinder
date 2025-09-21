const express = require('express');

const app = express();


//works for  /ac , /abc also
app.get("/ab?c",(req,res) => {
  res.send("Getting all the data from DB");
})

app.get("/user",(req,res) => {
  res.send("Getting all the data from DB");
})

app.post("/user",(req,res) => {
  console.log("adding data to db");
  res.send("Data added successfully to DB");
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});