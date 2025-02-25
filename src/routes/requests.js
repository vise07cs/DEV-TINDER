const express=require("express");
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const requestRoute=express.Router();
const ConnectionRequest=require ("../model/connectionRequest.js");
const User = require("../model/user.js");






requestRoute.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
  try {

    
  
    
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status 

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














module.exports=requestRoute;