"use strict";
const send = document.getElementById('send');
const mess_box = document.getElementById('mess_box');

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