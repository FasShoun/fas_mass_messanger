const messdb = require("./../db/message");

var mgsApi = (async (req,res,next)=>{
    try{
       let mgsData =  await messdb.find();
       res.send(mgsData);
    }catch(err){
        console.log(err)
    }
})

module.exports = mgsApi;