require("dotenv").config();
const mongoose = require("mongoose");
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
  },
  pass: {
    type:String,
    required:true
  },
  repass: String,
});

const goData = mongoose.model("fas_messanger", newSchema);
module.exports = goData;
