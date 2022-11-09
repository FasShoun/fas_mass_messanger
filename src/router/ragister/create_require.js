const goData = require("./../../db/conndb");
require("../../db/conndb");

// --message
const loginSuccess = "Create account successful plz login!";
const userError = "user is already taken try another name";
const gmailError = "Gmail is already taken Plz login";
const passError = "Password not match try again";
const createAccountRequire = async (req,res,next)=>{
    try {
        const pass = req.body.pass;
        const rePass = req.body.repass;
        if (pass === rePass) {
          const inputData = req.body;
          const getData = new goData(inputData);
          const davaSaveDb = await getData.save();
          console.log(davaSaveDb);
          res.render("login", { createSuccess: loginSuccess });
          // res.render("create", { createSuccess: loginSuccess });
        } else {
          res.render("create", { passError: passError });
        }
        next()
      }catch(err) {
        console.log("Irroe block")
        if (err.keyValue.userName) {
          res.render("create", { userError: userError });
        } else if (err.keyValue.gmail) {
          res.render("create", { gmailError: gmailError });
        }
      }
}
module.exports = createAccountRequire;