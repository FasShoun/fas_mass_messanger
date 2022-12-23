const messdb = require("./../db/message");

const mgs_send = async (req, res, next) => {
  try {
    let messdbSend = new messdb(req.body);
    let checkText = req.body.text.trim()
     if(checkText == ''){
        return
     }else{
      await  messdbSend.save();
     }
    // next();
  } catch (error) {
    console.log(error)
  }
};

module.exports = mgs_send;


