const mongoose=require("mongoose")
const { Schema } = mongoose;
const userSchema=new Schema({
  firstName:{
    type:String,
    maxLength:20,
    minLength:3,
    required:true,
    trim:true
  },
  lastName:{
    type:String,
    trim:true
  },
  age:{
    type:Number,
    required:true,
    min:18

  },
  email:{
    type:String,
    unique: true,
    required:true,
    lowercase:true,
    trim:true    
  
  },
  password:{
    type:String,

  },
  gender:{
    type:String,
    validate: {
      validator: function(value) {
        return ["male", "female", "other"].includes(value);
      },
      message: err => `${err.value} is not a valid gender. Allowed values: Male, Female, Other`
    }

  },
  location:{
    type:String,
    default:"INDIA"

  }
    
}, { timestamps: true })
module.exports=mongoose.model("User",userSchema)