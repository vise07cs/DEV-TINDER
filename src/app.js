const express=require("express");
const app=express();
const port=3001;

app.get("/",(req,res)=>{
  res.send("WELCOME TO THE LANDING PAGE")
})
app.get("/home",(req,res)=>{
  res.send("WELCOME TO THE HOME PAGE !!!!!!!!!!")
})

app.get("/contact",(req,res)=>{
  res.send("CONTACT US")
})

app.listen(port,()=>{
  console.log("App running successfully on port 3001")
});
