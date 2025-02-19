const mongoose=require("mongoose")
const { Schema } = mongoose;
const validator=require("validator")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
 
    min:18,
    

  },
  email:{
    type:String,
    unique: true,
    required:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(validator.isEmail(value)==false){
        throw new Error("invalid email");
        
      }
      
    },    
  
  },
  password:{
    type:String,
    validate(value){
      if(validator.isStrongPassword(value)==false){
        throw new Error("write a strong password");
        
      }
    }

  },

  skills:{

    type:[""]
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

userSchema.methods.getJWT=async function () {
  const user=this;

  const token=await jwt.sign({_id:user._id},"DevTinder@123")

  
  return token;

  
}

userSchema.methods.validatePassword=async function(passwordInputByUser) {
  const user=this;
  const passwordHash=user.password;
  const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
  return isPasswordValid;
  
}





module.exports=mongoose.model("User",userSchema)