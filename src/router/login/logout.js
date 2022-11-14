const logout = async(req, res, next) => {
  try{
    let a = res.clearCookie("jwt");
    if(a){
        res.redirect("login");
        next();
    }
  }catch(err){
    console.log(err)
  }
};
module.exports = logout;
