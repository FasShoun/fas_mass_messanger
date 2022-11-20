const jwt = require('jsonwebtoken');
const goData = require("./../db/conndb");
const fs = require('fs');

// routing
let delete_one = async(req,res,next)=>{
   try {
    const genToken = await req.cookies.jwt;
    const id = await jwt.verify(genToken,process.env.jwtGen);
    if(genToken){
         // image delete
         const getId = await goData.findOne({_id:id});
         let getImageName = getId.upFile.fileName;
         if(getImageName == 'unique/avator.png'){
        }else{
          fs.unlink(`public/uploads/${getImageName}`,(err)=>{
          });
        }
        // coockie clear
        res.clearCookie("jwt");
        console.log(`user delete ${getId.userName}`)
        // delete user
        await goData.findByIdAndDelete({_id:id});
         next();
    }
   } catch (err) {
    console.log("Delete error is: "+err)
    next();
   }
};

module.exports = delete_one;