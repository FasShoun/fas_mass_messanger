require("dotenv").config();
const mongoose = require("mongoose");
(async function main() {
    try {
      await mongoose.connect(process.env.mongodbMessage);
      console.log("Mongodb message connect success");
    } catch (err) {
      console.log("Mongodb message not connect");
      console.log(err)
    }
  }())

const messagesSchema = new mongoose.Schema({
    conversationId:{
    type: String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    },
},
{timestamps:true})

const messdb = mongoose.model('fas_messanger_chat',messagesSchema);
module.exports = messdb;