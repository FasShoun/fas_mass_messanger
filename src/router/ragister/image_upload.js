const goData = require("./../../db/conndb");
const  jwt= require("jsonwebtoken");
const fs = require('fs');

const imageUpload = async (req, res, next) => {
  try {
    const genToken = await req.cookies.jwt;
    const id = await jwt.verify(genToken,process.env.jwtGen);
    const getId = await goData.findOne({_id:id});
    await goData.updateOne({userName:getId.userName },{$set:{upFile:{
        fileName:req.file.filename,
        fileType:req.file.mimetype,
        fileSize:req.file.size,
        fileDestination:req.file.destination
      }}});
      // old image delete
      let getImageName = getId.upFile.fileName;
      if(getImageName == 'unique/avator.png'){
      }else{
        fs.unlink(`public/uploads/${getImageName}`,(err)=>{
        });
      }
    // new image uploading time and render
    setTimeout(async()=>{
      var getImg =await goData.findById({_id:id});
      res.render("fasMass",{image:getImg.upFile.fileName,name:getImg.fullName,hi_name:getImg.userName,title:`Welcome ${getImg.fullName}`});
    },500)
  } catch (err) {
    console.log("Multer error " + err);
  }
  next();
};

module.exports = imageUpload;
