const express=require("express");
const app=express()
const cors=require("cors")
// const bodyParser= require('body-parser')
const mongoose=require("mongoose");
app.use(express.json())
app.use(cors())
// app.use(bodyParser.urlencoded({extended: true})); 
// app.use(bodyParser.json())
mongoose.connect("mongodb://localhost:27017/login_user").then(()=>{
    console.log("mongoodb connection successfull running");
})
app.use(require("./Module/User.js"));
app.use(require("./Module/Todo.js"));

app.get("/",(req,res)=>{
res.send("hello nodejs fans");
})

app.listen(5000,()=>{
    console.log("successfull running 5000 port")
})