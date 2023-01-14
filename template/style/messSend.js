"use strict";
var send = document.getElementById("send");
var mess_box = document.getElementById("mess_box");
var userPic = document.getElementById("userPic");
var user_top = document.getElementById("userPic_top");
var userPic_n = document.getElementById("userPic_n");
var not_found = document.getElementById("not_found");
var mgs_send = new Audio("sound/mgs_send.mp3");
var mgs_come = new Audio("sound/mgs_come.mp3");
var sec_f = document.getElementById("sec_f");
var correntUser = document.getElementById("correntUser");
var loading_body = document.getElementById("loading_body");
var right_section = document.getElementsByClassName("right_section")[0];
let left_section = document.getElementsByClassName('left_section')[0];


window.addEventListener("keyup", (key) => {
  if (key.key == "Enter") {
    sendMgs();
  }
});
// ---------------------
// current login & send message id's
var correntLogin_id;
var message_id;
var messageCome;
var socket = io();

setTimeout(()=>{
  socket.emit('login',{messageId:message_id,currentLogin:correntLogin_id})
},1500)


// receive message form server
socket.on('userSelect_send',(val)=>{
  // console.log(val);
}) 
socket.on('socket_mgs',(val)=>{
  socket.emit('mgs_come',val.selectUser)
  setTimeout(()=>{
    if(messageCome == message_id){
      if(val.mgs.trim() != ""){
        let createDiv = document.createElement("div");
            createDiv.classList.add("messLeft");
            createDiv.innerHTML = `<p id="messRight_p">${val.mgs}</p>`;
            mess_box.appendChild(createDiv);
            document.getElementsByClassName("mess_box")[0].scrollBy(0, 400);
            document.getElementsByClassName("mess_box")[0].style =
            "scroll-behavior: smooth";
      }
    }
  },400)

})


// send message to chient to server use onclick
function sendMgs() { 
    // user message select & message come in live

    socket.emit("user_message", {mgs:send.value,mainUser:correntLogin_id ,selectUser:message_id});
  // send message data in backen use fech post request
  fetch("http://localhost/mgs", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId: correntLogin_id,
      message_id: message_id,
      text: send.value,
    }),
  }).then((val) => {
    console.log(val);
  });

  const inputValue = send.value;
  if (inputValue.trim() != "") {
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
  user1.style.display = "none";
  user1.value = "";
}
// user search hide & and show
document.getElementById("searchUser").addEventListener("click",searchHide)
function searchHide() {
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
};
// user database data fatch
const url = `http://localhost/api:7895`;
let getApi = async (search) => {
  try {
    let getFetch = await fetch(url);
    let jshonToArr = await getFetch.json();
    jshonToArr.forEach((value, index, array) => {
      if (correntUser.innerText == value.userName) {
        correntLogin_id = value._id;
      }
      if (correntLogin_id == value._id) {
        return;
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
      // active user style
      socket.on('activeUser',val=>{
       document.getElementById(val).classList.add('user_active')
      })
      // inActive user style
      socket.on('inActiveUser',val=>{
        //console.log(val)  // =====
        document.getElementById(val).classList.remove('user_active')
       })
      // mgs come form user style
      socket.on('mgs_come_val',val=>{
        if(value._id == val){
          messageCome = val;
          //console.log(val) // =====
          document.getElementById(val).style.backgroundColor = 'lightgreen'
        }
      })
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
        // for search user
        "onclick",
        `findSpacifyUser('${userName}','${gmail}','${file}','${rName}','${index}','block')`
      );
      cU_f.setAttribute("class", "new_tr");
      cU_f.setAttribute("id", rName);
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
        // for display append user
        `onclick`,
        `findSpacifyUser('${userName}','${gmail}','${file}','${rName}','${index}'),setTimeout(()=>{style = 'background-color:gray'},100)`
      );
      cU.setAttribute("class", "new_tr");
      cU.setAttribute("id", rName);
      cU.innerHTML = `
      <img src="uploads/${file}">
          <td>${userName}</td>
          <td>${gmail}
          </td>`;
      sec.appendChild(cU);
    }
    return;
  }
}
let mgsUrl = "http://localhost/api/user/mgs:789";
let getMgs = async (correntLogin_id, message_id) => {
  try {
    let fetchMgs = await fetch(mgsUrl);
    let fetchMgsToString = await fetchMgs.json();
    fetchMgsToString.forEach((val) => {
      if (
        val.conversationId == correntLogin_id &&
        val.message_id == message_id
      ) {
        if (val.conversationId == correntLogin_id) {
          let createDiv = document.createElement("div");
          loading_body.style.display = 'block';
          right_section.style.display = "none";
          setTimeout(()=>{
            if(true){
              createDiv.classList.add("messRight");
              createDiv.innerHTML = `<p id="messRight_p">${val.text}</p>`;
              mess_box.appendChild(createDiv);
              document.getElementsByClassName("mess_box")[0].scrollBy(0, 800);
              document.getElementsByClassName("mess_box")[0].style =
              "scroll-behavior: smooth";
              setTimeout(()=>{
              loading_body.style.display = 'none';
              right_section.style.display = "block";
              mess_box.scrollTop = mess_box.scrollHeight;
            },50)
            }
          },500)}
      }if(val.conversationId  ==  message_id &&  val.message_id ==correntLogin_id){
        setTimeout(() => {
          let createDiv = document.createElement("div");
        createDiv.classList.add("messLeft");
        createDiv.innerHTML = `<p id="messRight_p">${val.text}</p>`;
        mess_box.appendChild(createDiv);
        document.getElementsByClassName("mess_box")[0].scrollBy(0, 400);
        document.getElementsByClassName("mess_box")[0].style =
        "scroll-behavior: smooth";
        },500);
      }
      
    });
  } catch (err) {
    alert("possibly the prooblem is Fetch URL error or mongodb server off");
    console.log(err);
  }
};
// user data show in message seection
function findSpacifyUser(
  userName,
  gmail,
  file,
  realName,
  index,
  display = 'noblock'
) {
// ------ socket io
socket.emit("userSelect",{mainUser:correntLogin_id ,selectUser:realName})
  // MESSAGE remove onclick
let mgsBlockRight = document.querySelectorAll('.messRight');
let mgsBlockLeft = document.querySelectorAll('.messLeft');
  setTimeout(()=>{
    for(let i = 0; i < mgsBlockRight.length; i++){
      mgsBlockRight[i].remove();
    }
  },500)
  setTimeout(()=>{
    for(let i = 0; i < mgsBlockLeft.length; i++){
      mgsBlockLeft[i].remove();
    }
  },500)
  message_id = realName;
  getMgs(correntLogin_id, message_id);
  userPic.src = `uploads/${file}`;
  userPic_top.src = `uploads/${file}`;
  userPic_n.src = `uploads/${file}`;
  document.getElementById("userName").innerHTML = userName;
  document.getElementById("userGmail").innerHTML = gmail;
  document.getElementById("userName_top").innerHTML = userName;
  if (display === "noblock") {
    let bgColorTempChange = document.querySelectorAll(".new_tr");
    bgColorTempChange.forEach((val)=>{
      val.style = "background-color: none";
    })
    document.getElementById("userFind").style.display = "none";
    let user1 = document.getElementById("user1");
    user1.value = "";
    user1.style.display = "none";
  }
  var serarchUser = document.getElementById("user1");
  serarchUser.value = "";
  serarchUser.style.display = "none";
  document.getElementsByClassName("find_box")[0].style.display = "none";

  // responsive section
  
  if (window.matchMedia('(max-width: 750px)').matches){
    left_section.style.display  = 'none';
  }else if (window.matchMedia('(min-width: 749px)').matches){
    left_section.style.display = 'block';
    right_section.style.display = 'blcok'
 } 
}
function previousSection(){
  if (window.matchMedia('(max-width: 750px)').matches){
    left_section.style.display = 'block';
    right_section.style.display = 'none'
  } 
  }