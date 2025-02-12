const express=require("express");
const {connectDB}=require("./config/database.js")
const app=express();
let port=3001

connectDB().then(()=>{
  try {
    console.log("database connected successfilly");
    app.listen(port,()=>{
      console.log("App running successfully on port 3001")
    });
    

    
  } catch (err) {
    console.log("Something went wrong")
    
  }
 
})



