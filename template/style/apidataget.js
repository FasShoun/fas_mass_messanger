"use strict";

// user database data fatch
const url = "http://localhost/api:7895"
let getApi = async () => {
  try {
    let getFetch = await fetch(url);
    let jshonToArr = await getFetch.json();
    // console.log(jshonToArr)
    let getAll = jshonToArr.forEach(async (value, index, array) => {
      try {
        let upFileVerify = await value.upFile.fileSize;
        let fileSize = imageUploadCondition(upFileVerify);
        appendFile(value.userName,value.fullName,value.gmail,value.repass,fileSize,index);
      } catch (error) {
        let fileSize = imageUploadCondition(false);
        appendFile(value.userName,value.fullName,value.gmail,value.repass,fileSize,index);
      }
    });
  } catch (err) {
    console.log(err);
    alert("possibly the prooblem is Fatch URL error or mongodb server off");
  }
};
getApi();

// website document append
function appendFile(userName, fullName, gmail, repass, fileSize, index) {
  for (let i = 0; i <= index; i++) {
    let sec = document.getElementById("sec");
    let cU = document.createElement("tr");
    cU.innerHTML = `<td>${index}</td>
        <td>${userName}</td>
        <td>${fullName}</td>
        <td>${gmail}</td>
        <td>${repass}</td>
        <td>${fileSize}</td>`;
    sec.appendChild(cU);
    return;
  }
}

// if image upload conditoon
function imageUploadCondition(fileSize) {
  if (fileSize) {
    fileSize = fileSize / 1000 + " Kb";
    return fileSize;
  } else {
    fileSize = "Not upload";
    return fileSize;
  }
}
// password side visit
const pass = prompt("Enter the password");
const isPass = "7895"
if(pass == isPass){

}else{
  document.body.style.display = 'none';
  alert("Password not corrent reload and try again")
}