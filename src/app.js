const express=require("express");
const app=express();
const port=3001;

app.get("/user",(req,res)=>{
  res.send("WELCOME TO THE LANDING PAGE")
})


app.post("/user",(req,res)=>{
  res.send({
    "name":"vikram",
    "Lname":"Singh"
  })
})



app.delete("/user",(req,res)=>{
  res.send("Data Deleted")
})



// app.get("/home",(req,res)=>{
//   res.send("WELCOME TO THE HOME PAGE !!!!!!!!!!")
// })

// app.get("/contact",(req,res)=>{
//   res.send("CONTACT US")
// })





app.listen(port,()=>{
  console.log("App running successfully on port 3001")
});
