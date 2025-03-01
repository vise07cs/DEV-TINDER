const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const userRoute=express.Router();

// API to get all the data of users who are interested in logged in profile

userRoute.get("/user/requests/recieved",userAuth,async (req,res)=>{

  try {
    const loggedInUser=req.user;
    // const status="interested";
    const connectionRequest=await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:"interested",
  
    }).populate("fromUserId",["firstName","lastName","age","skills"])
    // console.log(connectionRequest)
    const data=await connectionRequest;
    // res.send("success "+ data)
    res.json({
      data
    })
  }  


   catch (error) {
    res.status(400).send("Something went wrong "+ error)
    
  }
})
 





module.exports=userRoute;