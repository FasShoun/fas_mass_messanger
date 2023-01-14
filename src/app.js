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
const { populate } = require("./db/conndb");

// socket io ----------
const http = require("http").Server(app);
// const io = require("socket.io")(http);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
  },
});
var users = [];
let user = {};
io.on("connection", (socket) => {
  socket.on("user_message", (val) => {
    users.forEach((value) => {
      if (val.selectUser == value.selectUser) {
        io.to(value.socketId).emit("socket_mgs", {
          mgs: val.mgs,
          selectUser: val.mainUser,
          mainUser: val.selectUser,
        });
      }
    });
  });
  // new user join
  socket.on("login", function (data) {
    // saving userId to object with socket ID
    user = {
      selectUser: data.currentLogin,
      socketId: socket.id,
      currentLogin: data.messageId,
    };
    users.push(user);
    users.forEach((val) => {
      io.emit("activeUser", val.selectUser);
    });
  });
  // socket.emit("userSelect_send",val +socket.id in console)
  socket.on("userSelect", (val) => {
    socket.emit("userSelect_send", {
      activeId: socket.id,
      correntLogin_id: val.mainUser,
      selectUser: val.selectUser,
    });
  });
  // user disconnect
  socket.on("disconnect", () => {
    users.forEach((val, i) => {
      if (val.socketId == socket.id) {
        setTimeout(() => {
          io.emit("inActiveUser", val.selectUser);
          delete val.selectUser;
          delete val.socketId;
          delete val.currentLogin;
        },1000);
      }
    });

    // delete {} empty object
    users.forEach((val, i) => {
      if (Object.keys(val).length === 0) {
        users.splice(i, 1);
      }
    });
  });

  socket.on("mgs_come", (val) => {
    socket.emit("mgs_come_val", val);
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
