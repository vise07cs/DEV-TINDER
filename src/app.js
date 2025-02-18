const express=require("express");
const {connectDB}=require("./config/database.js")

const User=require("./model/user.js")
const {validateUser}=require("./utils/validations.js")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app=express();
const {userAuth}=require('./middlewares/auth.js')
app.use(express.json());
// middleware by express to convert json data(POSTMAN) to js objects

app.use(cookieParser());
// middleware to read cookies

let port=3001
// API to add new user to the database
app.post("/signup",async (req,res)=>{
  // creating a helper function to validate the data entered
  // creating a new user 
// not a good idea to use req.body as attackers might send malicious data 
 try {
   
    const { firstName, lastName, email, password } = validateUser(req);

  
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

    const user=new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
  });
  console.log(user)

  
    await user.save();
    res.send("user added successfully")
    console.log('user added successfully');
      
  } catch (error) {
    res.status(501).send("unable to add data "+error)
    console.log(error)


    console.log(error)
    // res.send(error)
    
  }

})

app.post("/login",async (req,res)=>{
  try {
    const{email,password}=req.body;
    const user=await User.findOne({email:email})
    if(!user){
      throw new Error("user does not exist");
      
    }

  
    
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword){
      throw new Error("Invalid Password");
      
    }
    else{
      // to generate JWT token
      const token=await jwt.sign({_id:user._id},"DevTinder@123")
      res.cookie("token",token)
      
      res.send("Login sucessful")
      // res.send(cookie)
      // console.log(cookie)






    }
    
  } catch (error) {
    res.send("Something went wrong  "+error)
    
  }


})


app.get("/profile",userAuth, async (req,res)=>{
  try {
    const user=req.user;
    console.log(user)
    res.send(user);

  } catch (error) {
    res.status(501).send("something went wrong "+ error)
    
  }
  
})

app.post("/sendConnectionRequest",userAuth, (req,res)=>{
  res.send("Connection request sent")

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



