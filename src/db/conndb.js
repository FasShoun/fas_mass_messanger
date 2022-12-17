require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var uniqueValidator = require('mongoose-unique-validator');
(async function main() {
  try {
    await mongoose.connect(process.env.mongodbConnect);
    console.log("Mongodb connect success");
  } catch (err) {
    console.log("Mongodb not connect");
    console.log(err)
  }
}())
// -- create schema
const newSchema = new mongoose.Schema({
  
  userName: {
    type: String,
    unique: true,
    min:1,
    trim:true
  },

  fullName: {
    type: String,
    min:1,
    trim:true
  },
  gmail: {
    type: String,
    unique: true,
  },
  pass: {
    type: String,
    required:true,
    min:6,
  },
  repass:{
    type:String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  upFile:{
    fileName:{
      type:String,
      default:"unique/avator.png"
    },
    fileType:{
      type:String,
      default:"fileType"
    },
    fileSize:{
      type:String,
      default:"fileSize"
    },
    fileDestination:{
      type:String,
      default:"fileDestination"
    },
  }
});
newSchema.plugin(uniqueValidator);
// --password bcrypt
newSchema.pre("save", async function(req, res, next) {
  try {
    this.pass = await bcrypt.hash(this.pass, 8);
    //  this.repass = undefined;
    next();
  } catch (err) {
    console.log(err);
  }
});
// --create mongoose model
const goData = mongoose.model("fas_messanger", newSchema);

module.exports = goData;
