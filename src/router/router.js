const express = require('express');
const router = express.Router();

// get items
const title =  "Welcome to secure messanger"
 router.get('/',(req,res)=>{
    res.render("index",{title:title})
})
router.get('/login',(req,res)=>{
    res.render("login",{title:title})
})
router.get('/create',(req,res)=>{
    res.render("create",{title:title})
})



module.exports = router;