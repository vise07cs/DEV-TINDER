const express=require("express");
const profileRoute=express.Router();
const User=require("../model/user.js")



const {userAuth}=require('../middlewares/auth.js')
const {validateEditDetails}=require("../utils/validations.js")



profileRoute.get("/profile/view",userAuth, async (req,res)=>{
  try {
    const user=req.user;
    console.log(user)
    res.send(user);

  } catch (error) {
    console.log(error)

    res.status(501).send("something went wrong "+ error)
    
  }
  
})

profileRoute.patch("/profile/edit",userAuth,async (req,res)=>{
  try {
    if(!validateEditDetails(req)){
      throw new Error("Invalid Requesrt");
      
    }
    console.log(req.body);
    // const loggedInUser=req.user;

    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
    // console.log(loggedInUser)

    await loggedInUser.save()



    res.send("profile updated successfully")



    
  } catch (error) {
    console.log(error)

    res.status(501).send("something went wrong "+ error)

    
  }
 


} )
module.exports=profileRoute