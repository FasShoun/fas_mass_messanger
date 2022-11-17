const goData = require("./../../db/conndb");
const  jwt= require("jsonwebtoken");

const imageUpload = async (req, res, next) => {
  try {
    const genToken = await req.cookies.jwt;
    const id = await jwt.verify(genToken,process.env.jwtGen);
    const getId =await goData.findOne({_id:id});
    await goData.updateOne({userName:"FasFoysal" },{$push:{"upFile":{
        "fileName":req.file.filename,
        "fileType":req.file.mimetype,
        "fileSize":req.file.size,
        "fileDestination":req.file.destination
      }}});
    res.render("fasMass",{name:getId.userName,title:`Welcome ${getId.userName}`});
  } catch (err) {
    console.log("Multer error " + err);
  }
  next();
};

module.exports = imageUpload;
