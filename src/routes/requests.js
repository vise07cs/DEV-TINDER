const express=require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const requestRoute=express.Router();
const ConnectionRequest=require ("../model/connectionRequest.js");
const User = require("../model/user.js");
const mongoose=require("mongoose")


// sending a connection request

requestRoute.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
  try {

  
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status 

    // if the status type is invalid
    const allowedStatus=["interested","ignore"]
    if(!allowedStatus.includes(status)){
      return res.status(400).send("invalid status type:  "+ status)
    
    }


    //  if connection already exists
      const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
          {fromUserId,toUserId},
          {fromUserId: toUserId, toUserId:fromUserId}
        ]
      })
      if(existingConnectionRequest){
        return res.status(400).send("Connection Request already exists")
      }

      // request should be sent to the user if they exist in database 

      const toUser=await User.findById(toUserId)
      if(!toUser){
        return res.status(400).send("User does not exists")
      }



    const connectionRequest=new ConnectionRequest({
      fromUserId,
      toUserId,
      status
      

    })
    const data=await connectionRequest.save();
    res.send(`( ${status}) request sent successfully`+ data)



  } catch (error) {
    res.send("Something went wrong"+ error)
    
  }
})

// the logged in user will either accept or reject the request
requestRoute.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
  const loggedInUser=req.user;
  const {status,requestId}=req.params
  const allowedStatus=["accepted","rejected"]
  if(!allowedStatus.includes(status)){
    res.status(400).send("Invalid status type")
  }
  const connectionRequest=await ConnectionRequest.findOne({
    _id:requestId,
    // below line to verify the request has been sent to logged in user
    toUserId:loggedInUser._id,

    // the status of the sent request  should be interseted 

    status:"interested",

  })
 

  if(!connectionRequest){
    res.status(400).send('Invalid request ')
  }
  connectionRequest.status=status;
  const data=await connectionRequest.save();
  res.send("data saved successfully and status is "+status + data)
            


})












module.exports=requestRoute;