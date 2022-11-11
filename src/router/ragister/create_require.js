const goData = require("./../../db/conndb");
require("./../../db/conndb");
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
          let getData = new goData(req.body);
          console.log(req.body)
          await getData.save();
          res.render("login", { createSuccess: loginSuccess });
          // res.render("create", { createSuccess: loginSuccess });
        } else {
          res.render("create", { passError: passError });
        }
        next();
      }catch(err) {
        if (err.errors.userName) {
          res.render("create", { userError: userError });
        } else if (err.errors.gmail) {
          res.render("create", { gmailError: gmailError });
        }
        next();
      }
}
module.exports = createAccountRequire;