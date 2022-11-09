require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

main();

async function main() {
  try {
    await mongoose.connect(process.env.mongodbConnect);
    console.log("Mongodb connect success");
  } catch (err) {
    console.log("Mongodb not connect");
  }
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
  gmail: {
    type: String,
    unique: true,
  },
  pass: {
    type: String,
    // required:true
  },
  repass: String,
  date: {
    type: Date,
    default: Date.now,
  },
  fileUp: {
    fileName: {
      type: String,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: String,
    },
  },
  fileDestination: {
    type: String,
  },
});

// --password bcrypt
newSchema.pre("save", async function (req, res, next) {
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
// newSchema
