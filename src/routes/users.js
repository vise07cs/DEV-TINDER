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
 
// API to get data of our connections (people who have accepted our requests or  people whose requests we have accepted )

userRoute.get("/user/connections",userAuth,async(req,res)=>{
  const loggedInUser=req.user;
  const connectionRequest=await ConnectionRequest.find({
    $or:[
      {toUserId: loggedInUser._id, status:"accepted"},
      {fromUserId: loggedInUser._id, status:"accepted"}
    ],

  // Ensure it correctly references your User model (via chatgpt)
  }).populate({
    path: "fromUserId toUserId",
    select: "firstName lastName age skills",
    model: "User" 
  });

  //  .populate("fromUserId",["firstName","lastName","age","skills"])
  //   .populate("toUserId",["firstName","lastName","age","skills"])

  const data=connectionRequest.map((row)=>{
    if(row.fromUserId._id.toString() ===loggedInUser._id.toString()){
      return row.toUserId;
    }
    return row.fromUserId;
  })


  // res.json(data)
  res.json({ success: true, data });
})






module.exports=userRoute;