const mongoose = require('mongoose');

async function connectDB() {
  const url="mongodb+srv://vikram7cs:ewyoehMII2egn4wr@namastenodejs.t8cfc.mongodb.net/"
  await mongoose.connect(url);
}


module.exports={connectDB};