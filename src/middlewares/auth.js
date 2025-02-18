const jwt = require('jsonwebtoken');
const User=require("../model/user.js");


const userAuth=async (req,res,next)=>{
  try {
    const {token}=req.cookies;
    if(!token){
      throw new Error("Token not valid");
      
    }
  
    const decodeObject=await jwt.verify(token,"DevTinder@123")
    const{_id}=decodeObject;
    const user=await User.findById(_id);
    if(!user){
      throw new Error("user not found");
      
    }
    req.user=user;
    next();
  
    
  } catch (error) {
    res.status(501).send("Something went wrong" + error)
    
  }
 

}



module.exports={userAuth};