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
// const io = require("socket.io")(http);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
  },
});
// const iosend = require('./router/socket')
var users = [];
let user = {};
io.on("connection", (socket) => {
  socket.on("user_message", (val) => {
    users.forEach(value=>{
      if( val.selectUser == value.selectUser){
        console.log('active user')
        io.to(value.socketId).emit('socket_mgs',{mgs:val.mgs});
      }else{
        // socket.emit('user_message',{mgs:val.mgs,selectUser:val.selectUser});
      }
    })


  });
  socket.on('login', function(data){
      // saving userId to object with socket ID
    user = {selectUser: data, socketId:socket.id}
    users.push(user)
  });

  socket.on('userSelect',(val)=>{
    // users.forEach(value=>{
    //   if( val.selectUser == value.selectUser){
    //     console.log(val.selectUser + ' + ' +value.socketId);
    //     io.to(value.socketId).emit('socket_mgs', 'for your eyes only');
    //   }else{
    //     console.log('user not found')
    //   }
    // })
      // socket.emit("userSelect_send",val +socket.id)
      socket.emit("userSelect_send",
      { activeId:socket.id,
        correntLogin_id:val.mainUser,
        selectUser:val.selectUser})
    })

  socket.on('disconnect',()=>{
    users.forEach(val=>{
      if(val.socketId == socket.id){
        delete val.selectUser;
        delete val.socketId;
      }
    })
  })

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
