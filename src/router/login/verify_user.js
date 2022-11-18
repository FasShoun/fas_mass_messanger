const  jwt= require("jsonwebtoken");
const goData = require("./../../db/conndb");

const author = async (req,res,next)=>{
    const title =  "Welcome to secure messanger";
   try{
       const genToken = await req.cookies.jwt;
       const id = await jwt.verify(genToken,process.env.jwtGen)
 if(genToken){
    let verifyCom = await goData.findOne({_id:id});
    res.render("fasMass",{name:verifyCom.fullName,title:`Welcome ${verifyCom.fullName}`,image:`${verifyCom.upFile.fileName}`});
}
    next();
   }catch(err){
    res.render("login",{title:title}); 
}}
module.exports = author;