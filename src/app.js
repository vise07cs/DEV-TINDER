const express=require("express");
const app=express();
let port=3001
app.get("/getData",(req,res)=>{
try {
  
    throw new Error("error");
    res.send("data is the new oil")
    
  
  
  
} catch (error) {
  res.status(501).send("something went wrong, from catch block")
  
}})



app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(501).send("something went wrong")
  }
})



app.listen(port,()=>{
  console.log("App running successfully on port 3001")
});


