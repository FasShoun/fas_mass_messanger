"use strict";
var send = document.getElementById("send");
var mess_box = document.getElementById("mess_box");
var userPic = document.getElementById("userPic");
var user_top = document.getElementById("userPic_top");
var userPic_n = document.getElementById("userPic_n");
var not_found = document.getElementById("not_found");
var mgs_send = new Audio("sound/mgs_send.mp3");
var sec_f = document.getElementById("sec_f");
var correntUser = document.getElementById("correntUser");
// message send
var message_id;
var correntLogin_id;
console.log(message_id, correntLogin_id)
document.querySelector("#sendBtn").addEventListener("click", upMessage);
function upMessage() {
  const inputValue = send.value;
  if (inputValue) {
  let createDiv = document.createElement("div");
  createDiv.classList.add("messRight");
  createDiv.innerHTML = `<p id="messRight_p">${inputValue}</p>`;
  mess_box.appendChild(createDiv);
  mgs_send.play();
  document.getElementsByClassName("mess_box")[0].scrollBy(0, 200);
  document.getElementsByClassName("mess_box")[0].style =
    "scroll-behavior: smooth";
  send.value = "";
  }
}
// press enter key send mgs
window.addEventListener('keyup',(key)=>{
  if(key.key == 'Enter'){
    upMessage()
  }
})
// ---------------------
// var message_id;
// var correntLogin_id;
// var socket = io();
//   // receive message form server
//   socket.on('message',(val)=>{
//     if(val){
//       let createDiv = document.createElement("div");
//     createDiv.classList.add("messRight");
//     createDiv.innerHTML = `<p id="messRight_p">${val}</p>`;
//     mess_box.appendChild(createDiv);
//     mgs_send.play();
//     document.getElementsByClassName("mess_box")[0].scrollBy(0, 200);
//     document.getElementsByClassName("mess_box")[0].style =
//       "scroll-behavior: smooth";
//     send.value = "";
//     }
//   })
// // send message to chient to server use onclick
// function sendMgs(){
//   socket.emit('user_message',send.value);
//   // send _id's
//   if(message_id == undefined){
//     alert('Select user plz!')
//   }else{
//   socket.emit('user_id',message_id);
//   socket.emit('conversationId_id',correntLogin_id);
//   }
// }

// -------------------
// logout & upload image show hidden
var moneSatting = document.getElementById("moneSatting");
var imgUp = document.getElementById("imgUp");
var deleteId = document.getElementById("deleteId");
var imgUpFinal = document.getElementById("imgUpFinal");
var mainBody = document.getElementsByClassName("mainBody");
// more option hide & show
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
  let user1 = document.getElementById("user1");
    user1.style.display = 'none';
    user1.value = "";
}
// user search hide & and show
document.getElementById("searchUser").addEventListener("click", function () {
  setTimeout(() => {
    var serarchUser = document.getElementById("user1");
    not_found.style.display = "block";
    if (serarchUser.style.display == "block") {
      serarchUser.value = "";
      serarchUser.style.display = "none";
      document.getElementsByClassName("find_box")[0].style.display = "none";
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
      if(correntUser.innerText == value.userName){
        correntLogin_id = value._id;  
      }
      if (search == undefined) {
        // view to screen
        var imageFile = value.upFile.fileName;
        appendFile(
          value.fullName,
          value.gmail,
          imageFile,
          index,
          undefined,
          value._id
        );
      } else if (
        // view to search
        search == value.fullName[0].toUpperCase() ||
        search == value.fullName[0].toLowerCase() ||
        search[1] == value.fullName[1].toUpperCase() ||
        search[1] == value.fullName[1].toLowerCase()
      ) {
        appendFile(
          value.fullName,
          value.gmail,
          value.upFile.fileName,
          index,
          "block",
          value._id
        );
      } else if (search == value.fullName) {
        appendFile(
          value.fullName,
          value.gmail,
          value.upFile.fileName,
          index,
          "block",
          value._id
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
  not_found.style.display = "block";
}

// website document append
function appendFile(userName, gmail, file, index, display, rName) {
  
  // search data append
  if (sec_f.childElementCount >= 2) {
    sec_f.children[0].remove();
  }
  var temparary = document.querySelectorAll(".temparary");
  for (let i = 0; i <= index; i++) {
    temparary.forEach((value) => {
      if (value.innerHTML == userName) {
        display = "none";
        not_found.style.display = "none";
      }
    });
    if (display == "block") {
      let cU_f = document.createElement("tr");
      cU_f.setAttribute(
        "onmouseover",
        `findSpacifyUser('${userName}','${gmail}','${file}','${rName}','${index}','block')`
      );
      cU_f.setAttribute("class", "new_tr");
      cU_f.innerHTML = `
          <img src="uploads/${file}">
          <td class="temparary">${userName}</td>
          <td>${gmail}</td>`;
      sec_f.appendChild(cU_f);
      not_found.style.display = "none";
      return;
    } else if (display == undefined) {
      // user append
      let sec = document.getElementById("sec");
      let cU = document.createElement("tr");
      cU.setAttribute(
        "onclick",
        `findSpacifyUser('${userName}','${gmail}','${file}','${rName}','${index}')`
      );
      cU.setAttribute("class", "new_tr");
      cU.innerHTML = `
          <img src="uploads/${file}">
          <td>${userName}</td>
          <td>${gmail}</td>`;
      sec.appendChild(cU);
    }
    return;
  }
}

// user data show in message seection
function findSpacifyUser(userName, gmail, file, realName, index, display = undefined) {
  message_id = realName;
  userPic.src = `uploads/${file}`;
  userPic_top.src = `uploads/${file}`;
  userPic_n.src = `uploads/${file}`;
  document.getElementById("userName").innerHTML = userName;
  document.getElementById("userGmail").innerHTML = gmail;
  document.getElementById("userName_top").innerHTML = userName;
  if(display != 'block'){
    document.getElementsByClassName("new_tr")[index].style =
    "background-color: gray";
    oldIndexNumber(index);
    document.getElementById("userFind").style.display = "none";
    let user1 = document.getElementById("user1");
    user1.style.display = 'none';
    user1.value = "";
  }
}
var oldIndexStor;
function oldIndexNumber(oldIndex) {
  if (oldIndexStor == undefined) {
    oldIndexStor = oldIndex;
    return;
  }
  document.getElementsByClassName("new_tr")[oldIndexStor].style =
    "background-color: none";
  oldIndexStor = oldIndex;
}