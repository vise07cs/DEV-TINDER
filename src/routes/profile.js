const express=require("express");
const profileRoute=express.Router();
const cookieParser = require('cookie-parser')

const {userAuth}=require('../middlewares/auth.js')



profileRoute.get("/profile",userAuth, async (req,res)=>{
  try {
    const user=req.user;
    console.log(user)
    res.send(user);

  } catch (error) {
    console.log(error)

    res.status(501).send("something went wrong "+ error)
    
  }
  
})
module.exports=profileRoute;