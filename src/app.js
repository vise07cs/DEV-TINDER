const express=require("express");
const app=express();
const port=3001;
const {adminAuth,userAuth}=require("./middlewares/auth.js")
app.use("/admin",adminAuth)
// app.use("/user",userAuth) 
 



app.get("/admin/getData",(req,res)=>{
    res.send("All data sent")

})

app.get("/admin/deleteData",(req,res)=>{
  res.send("All data deleted")

})

app.get("/user/login",(req,res)=>{
  res.send("Login Page")

})

// app.get("/user",(req,res)=>{
//   res.send("user data")

// })

app.get("/user/data",userAuth,(req,res)=>{
  res.send("shows user data")

})











// app.get("/user",(req,res,next)=>{
//   console.log("route handler 01")
//   next();
// },
// (req,res,next)=>{
// console.log("route handler 02")
//  next();
// },
// ((req,res)=>{
//   console.log("route handler 03")
//   res.send("route handler 03")
// }



// )
// )



// app.get("/user",(req,res)=>{
//   res.send("WELCOME TO THE LANDING PAGE")
// })

// app.get('/users/:userId/books/:bookId',(req,res)=>{
//   // res.send("WELCOME TO THE ABC PAGE")
//   res.send(req.params)
// })


// app.post("/user",(req,res)=>{
//   res.send({
//     "name":"vikram",
//     "Lname":"Singh"
//   })
// })



// app.delete("/user",(req,res)=>{
//   res.send("Data Deleted")
// })



// app.get("/home",(req,res)=>{
//   res.send("WELCOME TO THE HOME PAGE !!!!!!!!!!")
// })

// app.get("/contact",(req,res)=>{
//   res.send("CONTACT US")
// })





app.listen(port,()=>{
  console.log("App running successfully on port 3001")
});
