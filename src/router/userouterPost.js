const express = require("express");
const router = express.Router();
const goData = require("./../db/conndb");
const multer = require("multer");
const upload = require("./userPostPic")
// const imgsave = requier('./../db/conndb');

// --message
const loginSuccess = "Create account successful plz login!";
const userError = "user is already taken try another name";
const gmailError = "Gmail is already taken Plz login";
const passError = "Password not match try again";
// --post mathod
router.post("/create", upload.array("file"), async (req, res) => {
  try {
    // const filename = req.files.map((val) => {
    //   return val.filename;
    // });
    const pass = req.body.pass;
    const rePass = req.body.repass;
    if(pass === rePass){
      const getData = new goData(req.body);
    await getData.save();
    console.log(getData);
    res.render("login", { createSuccess: loginSuccess });
    }else{
      res.render("create", { passError: passError });
    }
  } 
  catch (err) {

    // multer Error
    if (err instanceof multer.MulterError) {
      console.log(err + "coustom error");
    }
    // --coustom error handaling
    if (err.keyValue.userName) {
      res.render("create", { userError: userError });
    } else if (err.keyValue.gmail) {
      res.render("create", { gmailError: gmailError });
    } else {
      res.render("error");
    }
  }
});
module.exports = router;
