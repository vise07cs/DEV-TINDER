const express=require("express");
const {connectDB}=require("./config/database.js")

const User=require("./model/user.js")
const {validateUser}=require("./utils/validations.js")
const bcrypt = require('bcrypt');
const app=express();

app.use(express.json());
// middleware by express to convert json data(POSTMAN) to js objects

let port=3001
// API to add new user to the database
app.post("/signup",async (req,res)=>{
  // creating a helper function to validate the data entered
  // creating a new user 
// not a good idea to use req.body as attackers might send malicious data 
 try {
    // validateUser(req)
    const { firstName, lastName, email, password } = validateUser(req);

    // const { password }=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

    const user=new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
  });
  console.log(user)

    // console.log(req.body)
    // console.log(req.body) will log the data is js object format due to middleware(express.json) 
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



// API to get user info from emailid
app.get("/user",async (req,res)=>{
  const userEmail=(req.body.email)
try {
  
  console.log(userEmail)
  console.log(userEmail.length)
  if(userEmail.length==0){
    res.status(404).send("Email not entered")
  }
  else{
    
    let myuser=await User.find({ email:userEmail })      
    res.send(myuser)
    console.log(myuser)
  }
    
} catch (error) {
  res.status(404).send("Something went wrong")
  
}
 
})

// Feed API to get all the users form database
app.get("/feed",async (req,res)=>{
  const users=await User.find({})
  try {
    res.send(users)
    console.log(users)
    
  } catch (error) {
    res.status(404).send("Something went wrong")
    
  }
  

})
// API to find a specefic user by id 
app.get("/id",async (req,res)=>{
    const userbyId=await User.findById('67adf54c8e4ff84a432875db')
    res.send(userbyId)
    console.log(userbyId)
})

// API to delete a user from database
app.delete("/user",async (req,res)=>{
  const userId=req.body.userId;
  try {
    let deletedUser=await User.findByIdAndDelete(userId);
    console.log(deletedUser.firstName+" " +deletedUser.lastName +" deleted")
    res.send(userId+" deleted")
    
  } catch (error) {
    res.status(404).send("Something went wrong")
    
  }
})


// API to update data of  a user in Database

app.patch("/user/:userId",async (req,res)=>{
  // API level validation
  const userId=req.params?.userId;
  const data=req.body;
  try {
    let allowed_updates=["firstName","lastName","age","skills"];
    let isAllowed=Object.keys(data).every((key)=>
      allowed_updates.includes(key)
    )
    console.log(isAllowed)
    
    if(isAllowed==false){
      throw new Error("Update not allowed")
      
    }

    if(data.skills.length>7){
      throw new error("ONLY 7 SKILLS ALLOWED AT MAX")
    }

    let updateUser=await User.findByIdAndUpdate(userId,data)
    // console.log(updateUser.firstName +" "+ "updated")
    console.log(updateUser)
    res.send("user updated successfully")    
  } catch (error) {
    res.status(404).send("Something went wrong"+ error)
    console.log(error)
    
    
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



