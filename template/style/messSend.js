"use strict";
const send = document.getElementById('send');
const mess_box = document.getElementById('mess_box');

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
var imgUpFinal = document.getElementById('imgUpFinal');
var mainBody = document.getElementsByClassName('mainBody');

function showHide(which){
     if(which == "moneSatting"){
        if(moneSatting.style.display == "block"){
            moneSatting.style.display = "none";
    }else{
        moneSatting.style.display = "block";
    }
     }else if(which == "imgUp"){
        if(imgUp.style.display == "block"){
            imgUp.style.display = "none";
    }else{
        imgUp.style.display = "block";
     }
}};
// user database data fatch
const url = "http://localhost/api:7895";
let getApi = async() => {
  try {
    let getFetch = await fetch(url);
    let jshonToArr = await getFetch.json();
    jshonToArr.forEach((value, index, array) => {
    appendFile(value.userName,value.gmail,index);
    })
  } catch (err) {
    alert("possibly the prooblem is Fatch URL error or mongodb server off");
  }
}
getApi()
// website document append
function appendFile(userName,gmail,index) {
    for (let i = 0; i <= index; i++) {
      let sec = document.getElementById("sec");
      let cU = document.createElement("tr");
      cU.innerHTML = `
          <td>${userName}</td>
          <td>${gmail}</td>`
      sec.appendChild(cU);
      return
    }
  }