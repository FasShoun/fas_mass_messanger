const goData = require("./../db/conndb");
const fs = require("fs");
const jwt = require("jsonwebtoken");
// routing
let delete_one = async (req, res, next) => {
  try {
    const genToken = await req.cookies.jwt;
    const id = await jwt.verify(genToken, process.env.jwtGen);
    let deleteName = req.body.deleteName;
    const getId = await goData.findOne({ _id: id });
    if (getId.userName == deleteName) {
      // image delete
      let getImageName = getId.upFile.fileName;
      if (getImageName == "unique/avator.png") {
      } else {
        fs.unlink(`public/uploads/${getImageName}`, (err) => {});
      }
      // delete user
      await goData.findByIdAndDelete({ _id: id });
      next();
    } else {
    }
  } catch (err) {
    console.log(err)
  }
};

module.exports = delete_one;
