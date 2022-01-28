const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    email:String,
    password:String,
    cpassword:String,
    token:String
})

const userData=mongoose.model("login",userSchema);

module.exports=userData