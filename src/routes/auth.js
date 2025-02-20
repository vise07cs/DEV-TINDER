// authentication routes

const express=require ('express');
const authRoute=express.Router();

const bcrypt = require('bcrypt');
const User=require("../model/user.js")
const {validateUser}=require("../utils/validations.js")
const cookieParser = require('cookie-parser')



// to add new user to the db
authRoute.post("/signup",async (req,res)=>{
  // creating a helper function to validate the data entered
  // creating a new user 
// not a good idea to use req.body as attackers might send malicious data 
 try {

   
    const { firstName, lastName, email, password } = validateUser(req);
    console.log("req sent")

  
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

    const user=new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
  });
  console.log(user)

  
    await user.save();
    res.send("user added successfully")
    console.log('user added successfully');
      
  } catch (error) {
    res.status(501).send("unable to add data "+error)
    console.log(error)


    console.log(error)
    // res.send(error)
    
  }

})


// to login 

authRoute.post("/login",async (req,res)=>{
  try {
    const{email,password}=req.body;
    const user=await User.findOne({email:email})
    if(!user){
      throw new Error("user does not exist");
      
    }

    const isPasswordValid=await user.validatePassword(password);

    if(!isPasswordValid){
      throw new Error("Invalid Password");
      
    }
    else{
      // to generate JWT token

      const token=await user.getJWT();
     
      res.cookie("token",token)
      
      res.send("Login sucessful")

    }
    
  } catch (error) {
    res.send("Something went wrong  "+error)
    console.log(error)
    
  }


})

module.exports=authRoute;