const express = require("express");
const app = express();

app.use("/",(req,res)=>{
    res.send("helooo from dashboard")
});

app.use("/test",(req,res)=>{
    res.send("helooooo from test route")
})
app.use("/test",(req,res)=>{
    res.send("helooooo from test route")
})

app.listen(3000);