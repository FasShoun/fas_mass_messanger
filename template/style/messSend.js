"use strict";
var send = document.getElementById('send');
var mess_box = document.getElementById('mess_box');
var userPic = document.getElementById('userPic');

// message send
document.querySelector('#sendBtn').addEventListener('click',upMessage);
function upMessage(){
    const inputValue = send.value;
    if(inputValue){
        let createDiv = document.createElement("div");
    createDiv.classList.add('messRight');
    createDiv.innerText = inputValue;
    mess_box.appendChild(createDiv);
    send.value = "";
    }
}

// logout & upload image show hidden
var moneSatting = document.getElementById('moneSatting');
var imgUp = document.getElementById('imgUp');
var deleteId = document.getElementById('deleteId');
var imgUpFinal = document.getElementById('imgUpFinal');
var mainBody = document.getElementsByClassName('mainBody');

function showHide(which){
     if(which == "moneSatting"){
        if(moneSatting.style.display == "block"){
            moneSatting.style.display = "none";
    }else{
        moneSatting.style.display = "block";
    }
     }
     else if(which == "imgUp"){
        if(imgUp.style.display == "block"){
            imgUp.style.display = "none";
    }else{
        imgUp.style.display = "block";
     }
  }else if(which == "deleteId"){
    if(deleteId.style.display == "block"){
      deleteId.style.display = "none";
    }else{
      deleteId.style.display = "block";
    }
  }
};
// user database data fatch
const url = "http://localhost/api:7895";
let getApi = async() => {
  try {
    let getFetch = await fetch(url);
    let jshonToArr = await getFetch.json();
    jshonToArr.forEach((value, index, array) => {
      let imageFile =  value.upFile.fileName ;
    appendFile(value.fullName,value.gmail,imageFile,index);
    })
  } catch (err) {
    alert("possibly the prooblem is Fatch URL error or mongodb server off");
  }
}
getApi()
// website document append
function appendFile(userName,gmail,file,index) {
    for (let i = 0; i <= index; i++) {
      let sec = document.getElementById("sec");
      let cU = document.createElement("tr");
      cU.setAttribute('onclick',`findSpacifyUser('${userName}','${gmail}','${file}')`)
      cU.innerHTML = `
          <img src="uploads/${file}">
          <td>${userName}</td>
          <td>${gmail}</td>`
      sec.appendChild(cU);
      return
    }
  }
// user data show in message seection
function findSpacifyUser(userName,gmail,file){
  userPic.src = `uploads/${file}`;
  document.getElementById('userName').innerHTML = userName;
  document.getElementById('text-left').innerHTML = userName;
  document.getElementById('userGmail').innerHTML = gmail;
  // userGmail.innerHTML = gmail;
}