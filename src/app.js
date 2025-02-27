const express=require("express");
const {connectDB}=require("./config/database.js")

const User=require("./model/user.js")
const {validateUser}=require("./utils/validations.js")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app=express();
// const {userAuth}=require('./middlewares/auth.js')
app.use(express.json());

const authRoute=require("./routes/auth.js")
const profileRoute=require("./routes/profile.js")
const requestRoute=require("./routes/requests.js")

app.use(cookieParser());
app.use("/",authRoute)
app.use("/",profileRoute)
app.use("/",requestRoute)
// middleware by express to convert json data(POSTMAN) to js objects

// middleware to read cookies

let port=3001
// API to add new user to the database






// app.post("/sendConnectionRequest",userAuth, (req,res)=>{
//   res.send("Connection request sent")

// })


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



// no updates on feb27th