const express=require("express");
const profileRoute=express.Router();
// const User=require("../model/user.js")
const User=require("../model/user.js")
const bcrypt = require('bcrypt');





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
// edit profile 
profileRoute.patch("/profile/edit",userAuth,async (req,res)=>{
  try {
    if(!validateEditDetails(req)){
      throw new Error("Invalid Requesrt");
      
    }
    // console.log(req.body);
    const loggedInUser=req.user;

    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
    // console.log(loggedInUser)

    await loggedInUser.save()



    res.send("profile updated successfully")




  } catch (error) {
    console.log(error)

    res.status(501).send("something went wrong "+ error)

    
  }
})
 





profileRoute.patch("/profile/edit/password",userAuth,async (req,res)=>{

   try {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new passwords are required" });
    }
  
     
     const loggedInUser=req.user;
 
     const passwordHash=loggedInUser.password;

  
     const isPasswordValid=await bcrypt.compare(oldPassword,passwordHash);

  
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect old password" });
  }
  
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(loggedInUser._id, { password: hashedNewPassword });
  
  res.status(200).json({ message: "Password updated successfully" });
    
  

    
}catch (error) {
      console.log(error)

    res.status(501).send("something went wrong "+ error)

    
   }
  })
 
module.exports=profileRoute

// no codes written on 23,24th of Feb