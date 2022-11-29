"use strict";
var send = document.getElementById("send");
var mess_box = document.getElementById("mess_box");
var userPic = document.getElementById("userPic");
var user_top = document.getElementById("userPic_top");
var userPic_n = document.getElementById("userPic_n");
var not_found = document.getElementById('not_found');
// message send
// document.querySelector('#sendBtn').addEventListener('click',upMessage);
// function upMessage(){
//     const inputValue = send.value;
//     if(inputValue){
//         let createDiv = document.createElement("div");
//     createDiv.classList.add('messRight');
//     createDiv.innerText = inputValue;
//     mess_box.appendChild(createDiv);
//     send.value = "";
//     }
// }

// socket io mgs send
var socket = io();
var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (send.value) {
    socket.emit("chat message", send.value);
    send.value = "";
  }
});
socket.on("chat message", function (msg) {
  let createDiv = document.createElement("div");
  createDiv.classList.add("messRight");
  createDiv.innerHTML = `<p id="messRight_p">${msg}</p>`;
  mess_box.appendChild(createDiv);
  window.scrollTo(0, document.body.scrollHeight);
});

// logout & upload image show hidden
var moneSatting = document.getElementById("moneSatting");
var imgUp = document.getElementById("imgUp");
var deleteId = document.getElementById("deleteId");
var imgUpFinal = document.getElementById("imgUpFinal");
var mainBody = document.getElementsByClassName("mainBody");

function showHide(which) {
  if (which == "moneSatting") {
    if (moneSatting.style.display == "block") {
      moneSatting.style.display = "none";
    } else {
      moneSatting.style.display = "block";
    }
  } else if (which == "imgUp") {
    if (imgUp.style.display == "block") {
      imgUp.style.display = "none";
    } else {
      imgUp.style.display = "block";
    }
  } else if (which == "deleteId") {
    if (deleteId.style.display == "block") {
      deleteId.style.display = "none";
    } else {
      deleteId.style.display = "block";
    }
  }
}
document.getElementById("searchUser").addEventListener("click", function () {
  setTimeout(() => {
    var serarchUser = document.getElementById("user1");
    if (serarchUser.style.display == "block") {
      serarchUser.value = "";
      serarchUser.style.display = "none";
      document.getElementsByClassName('find_box')[0].style.display = 'none';
    } else {
      serarchUser.style.display = "block";
    }
  }, 100);
});
// user database data fatch
const url = "http://localhost/api:7895";
let getApi = async (search) => {
  try {
    let getFetch = await fetch(url);
    let jshonToArr = await getFetch.json();
    jshonToArr.forEach((value, index, array) => {
      if (search == undefined) {
        var imageFile = value.upFile.fileName;
        appendFile(value.fullName, value.gmail, imageFile, index);
        console.log("message");
      } else if (search == value.fullName) {
        appendFile(
          value.fullName,
          value.gmail,
          value.upFile.fileName,
          index,
          "block"
        );
      }
    });
  } catch (err) {
    alert("possibly the prooblem is Fetch URL error or mongodb server off");
    console.log(err);
  }
};
getApi();
// search user name
function getSearchFullName() {
  let searchUserName = document.getElementById("user1");
  document.getElementById("userFind").style.display = "block";
  getApi(searchUserName.value);
}

// website document append
function appendFile(userName, gmail, file, index, display) {
  // search data append
  for (let i = 0; i <= index; i++) {
    if (display == "block") {
      let sec_f = document.getElementById("sec_f");
      let cU_f = document.createElement("tr");
      cU_f.setAttribute(
        "onclick",
        `findSpacifyUser('${userName}','${gmail}','${file}')`
      );
      cU_f.innerHTML = `
          <img src="uploads/${file}">
          <td>${userName}</td>
          <td>${gmail}</td>`;
      sec_f.appendChild(cU_f);
      not_found.style.display = "none";
      return;
    }
  // user append
  let sec = document.getElementById("sec");
  let cU = document.createElement("tr");
  cU.setAttribute(
    "onclick",
    `findSpacifyUser('${userName}','${gmail}','${file}')`
  );
  cU.innerHTML = `
          <img src="uploads/${file}">
          <td>${userName}</td>
          <td>${gmail}</td>`;
  sec.appendChild(cU);
  return;
  }
}

// user data show in message seection
function findSpacifyUser(userName, gmail, file) {
  userPic.src = `uploads/${file}`;
  userPic_top.src = `uploads/${file}`;
  userPic_n.src = `uploads/${file}`;
  document.getElementById("userName").innerHTML = userName;
  document.getElementById("userGmail").innerHTML = gmail;

  document.getElementById("userName_top").innerHTML = userName;
  document.getElementById("text-left_top").innerHTML = userName;
}
