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



