const mongoose=require("mongoose")
const { Schema } = mongoose;
const userSchema=new Schema({
  firstName:String,
  lastName:String,
  age:Number,
  email:String,
  password:String,
  gender:String
    
})
module.exports=mongoose.model("User",userSchema)