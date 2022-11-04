require('dotenv').config();
const express = require('express');
const app = express();
require("./db/conndb");
const userouter = require('./router/router');
const userouterPost = require('./router/userouterPost');
const hbs = require("hbs");
const path = require("path");

const port = process.env.openPort || process.env.port

// file set
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"))
app.use(('/bootstrap'),express.static(path.join(__dirname,"./../node_modules/bootstrap/dist")))
app.use(('/style'),express.static(path.join(__dirname,"./../template/style")))


// view engine hbs render
app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname,"../template");
app.set("views",viewsPath)
const hbsPartials = path.join(__dirname,"../template/partials");
hbs.registerPartials(hbsPartials);

// routing
app.use(('/'),userouter);
app.use(('/login'),userouter);
app.use(('/create'),userouter);
app.post(('/create'),userouterPost);
// app.use(('/create'),)
app.get(("*"),((req,res)=>{
    res.render("error")
}))

app.listen(process.env.openPort, ()=>{
    console.log(`port open in ${port}`)
})