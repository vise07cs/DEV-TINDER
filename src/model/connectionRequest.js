const mongoose=require("mongoose");
const { applyTimestamps } = require("./user");
const { Schema } = mongoose;

const connectionRequestSchema=new Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true

  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required: true

  },
  status:{
    type:String,
    required: true,
    enum:{
      values:["ignore","interested","accepted","rejected"],
      message:`{VALUE} is incorrect status type `
    }

  }
},{timestamps: true})

// this will be called before saving to database
connectionRequestSchema.pre("save", function (next){
  const connectionRequest=this;
  
  //to check if toUserId and fromUserId are same
  
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannot send request to yourself");
    
  }
  next()

})

const ConnectionRequest= mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;