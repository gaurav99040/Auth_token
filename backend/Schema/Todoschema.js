const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    title:String,
    discription:String,
    userref_id:{type:mongoose.Schema.Types.ObjectId,ref:'login'}
})

// Request.aggregate([
//     {
//       $lookup: {
//          from: "login", // collection name in db
//          localField: "userid",
//          foreignField: "_id",
//          as: "todo"
//       }
//     }
//  ])
const userData=mongoose.model("todo",userSchema);

module.exports=userData