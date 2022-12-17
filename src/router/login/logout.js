const logout = async(req, res, next) => {
    try{
      res.clearCookie("jwt");
      next();
    }catch(err){
      console.log(err)
    }
};
module.exports = logout;
