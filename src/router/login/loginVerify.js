require("dotenv").config();
const goData = require("./../../db/conndb");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//-- message
const userError = "User not valid!!!";
const passError = "Password not correct";
const loginVerify = async (req, res, next) => {
  try {
    const userGmail = req.body.userName;
    const password = req.body.pass;
    const userGmailMatch = await goData.findOne({
      $or: [{ userName: userGmail }, { gmail: userGmail }],
    });
    const passCheck = await bcrypt.compare(password, userGmailMatch.pass);
    if (passCheck) {
      // ganerate webtoken $ render
      const token = jwt.sign(userGmailMatch._id.toString(),process.env.jwtGen);
       res.cookie("jwt",token);
      if(token){
        res.render("fasMass",{name:userGmailMatch.userName,title:`Welcome ${userGmailMatch.userName}`});
      }else{
        res.render("login")
      }
      
    } else {
      res.render("login", { passError: passError });
    }
    next();
  } catch (err) {
    res.render("login", { userError: userError });
  }
};

module.exports = loginVerify;
