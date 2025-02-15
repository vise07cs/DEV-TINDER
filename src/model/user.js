const mongoose=require("mongoose")
const { Schema } = mongoose;
const validator=require("validator")
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
module.exports=mongoose.model("User",userSchema)