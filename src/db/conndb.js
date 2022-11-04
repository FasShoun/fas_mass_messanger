require("dotenv").config();
const mongoose = require("mongoose");
var validator = require("validator");
// const { default: isEmail } = require("validator/lib/isEmail");

main()
  .then(console.log("Mongodb connect success"))
  .catch((err) => console.log("mongodb not connect"));

async function main() {
  await mongoose.connect(process.env.mongodbConnect);
}
// -- create schema
const newSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  gmail:{
    unique: true,
    type:String,
    required:true,
    validate(val){
      if (!validator.isEmail(val)) {
        throw new Error("Gmail Not validate");
      }
    }},
  pass: {
    type:String,
    minLength:4,
    validate(val) {
      if (!validator.isStrongPassword(val)){
        console.log(val)
        throw new Error("Password not validate");
         }}
   },
  repass: String,
});

const goData = mongoose.model("fas_messanger", newSchema);
module.exports = goData;
