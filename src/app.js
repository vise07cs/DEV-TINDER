const express=require("express");
const {connectDB}=require("./config/database.js")
const User=require("./model/user.js")
const app=express();
let port=3001

app.post("/signup",async (req,res)=>{
  const user=new User({
    firstName:"akshay",
    lastName:"singh",
    email:"a7cs@gmail.com",
    age:30,
    password:"akshay@1234"

  })

  try {
    await user.save();
    res.send("user added successfully")
    console.log('user added successfully');
  
    
  } catch (error) {
    res.status(501).send("unable to add data ")
    
  }

 


})

connectDB().then(()=>{
  try {
    console.log("database connected successfilly");
    app.listen(port,()=>{
      console.log("App running successfully on port 3001")
    });

    // cleaner way to write code . 1st connect to the database and then listen to the server 
    

    
  } catch (err) {
    console.log("Something went wrong")
    
  }
 
})



