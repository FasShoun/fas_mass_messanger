require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conndb");
const userouter = require("./router/router");
const hbs = require("hbs");
const path = require("path");
const cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const { connect } = require("http2");
// const { Namespace } = require('socket.io');
// ---------------
// socket io


const http = require("http").Server(app);
const io = require("socket.io")(http);
// const iosend = require('./router/socket')
io.on("connection", (socket) => {
    console.log('new use is '+ socket.id);
    socket.on('disconnect',()=>{
      console.log('User disConnect')
    })
   
  socket.on("user_message", (val) => {
    socket.send(val);
  });
});

// -------------
const port = process.env.openPort || process.env.port;
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "./../node_modules/bootstrap/dist"))
);
app.use("/style", express.static(path.join(__dirname, "./../template/style")));
app.use(cookieParser());
app.use(userouter);

// view engine hbs render
app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "../template");
app.set("views", viewsPath);
const hbsPartials = path.join(__dirname, "../template/partials");
hbs.registerPartials(hbsPartials);

// socket io & port listen
http.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});
module.exports = io;
