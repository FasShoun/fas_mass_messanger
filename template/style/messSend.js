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
}}