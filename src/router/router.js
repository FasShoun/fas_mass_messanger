const express = require('express');
const router = express.Router();
const author = require('./login/verify_user');

// const upload = require("./ragister/img_upload_conf");
// const imageUpload = require("./ragister/image_upload");
const createAccountRequire = require('./ragister/create_require');
const loginVerify = require("./login/loginVerify");
const dataApi = require("./dataAPi");
const fasMass = require("./fasMass");
// --get items
const title =  "Welcome to secure messanger"
 router.get('/',author,(req,res)=>{
    // author for already login user ro not
})
// --login
router.get('/login',author,(req,res)=>{
    // author for already login user ro not
})
//--create
router.get('/create',(req,res)=>{
    res.render("create",{title:title})
})

// {------- hidden page
router.get('/user:789',(req,res)=>{
    res.render("user",{title:title})
})
router.get('/api:789', dataApi,(req,res)=>{
})
// router.get('/fasMess',fasMass,(req,res)=>{
// })
// ------}

// --post mathod
router.post("/create",createAccountRequire,(req,res)=>{
})
router.post('/login',loginVerify,(req,res)=>{
})
module.exports = router;