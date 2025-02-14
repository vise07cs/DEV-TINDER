const express=require("express");
const {connectDB}=require("./config/database.js")
const User=require("./model/user.js")
const app=express();

app.use(express.json());
// middleware by express to convert json data(POSTMAN) to js objects

let port=3001

app.post("/signup",async (req,res)=>{

  const user=new User(req.body);
  // creating a new user 


  try {
    console.log(req.body)
    // console.log(req.body) will log the data is js object format due to middleware(express.json) 
    await user.save();
    res.send("user added successfully")
    console.log('user added successfully');
      
  } catch (error) {
    res.status(501).send("unable to add data ")
    
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



