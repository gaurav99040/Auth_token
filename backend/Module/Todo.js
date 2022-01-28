const todo=require("../Schema/Todoschema");
const user=require("../Schema/Userschema")


const express=require("express");
const { response } = require("express");
// const { response } = require("express");
const route=express.Router();

route.get("/todolist",async(req,res)=>{
    try{
    const {token}=req.headers

    const finduser=await user.findOne({token:token});
    console.log(finduser)
    const todoFind =await todo.find({userref_id:finduser._id})
    res.send(todoFind)
    // user.find({_id:finduser._id}).populate({path: 'todo', select: {title,discription}}).then(data => console.log('found populate data => ',data)).catch(err=>console.log(err, 'in found populate '))
// const findTodo=await todo.find();
// res.send()
    }catch(err){
   console.log(err)
    }
})


route.post("/addtodo",async(req,res)=>{
    try{
    const {title,discription}=req.body;
    const {token}=req.headers
    // console.log(token)

    const finduser=await user.findOne({token:token});
    // console.log(finduser)
    const addtodo=await todo.create({title,discription,userref_id:finduser._id});
    const savetodo=await addtodo.save();
if(savetodo){
    res.json({massage:"successfull data save"})
}
    }
    catch(err){
        console.log(err)
    }
})

route.delete("/deletetodo/:id",async(req,res)=>{
    try{
    const {id}=req.params;
    // const {token}=req.headers
    const deletetodo=await todo.findByIdAndDelete({_id:id});
    // const finduser=await user.findOne({token:token});
    // const todoFind =await todo.find({userref_id:finduser._id})
   if(deletetodo){
    res.status(200).json({massage:"delete success full"})
   }
}catch(err){
    res.status(204).json({massage:err})
    
}
    // const deletetodo=await todoFind.find

})


route.put("/updatetodo/:id",async(req,res)=>{
    try{
    const {id}=req.params;
    const todoupdate=await todo.findByIdAndUpdate({_id:id},req.body,{new:true});
    
    if(todoupdate){
        res.status(200).json({massage:"update success full"})
       }
    }catch(err){
       console.log(err)
    }
})




module.exports = route