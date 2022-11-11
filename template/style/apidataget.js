"use strict";

const url = "http://localhost/api:7895";
let getApi = async ()=>{
    try{
        let getFetch = await fetch(url);
        let jshonToArr =  await getFetch.json()
        // console.log(jshonToArr)
        let getAll = jshonToArr.forEach((value, index, array) => {
            for(let i = 0 ; i<=index; i++){
                let sec = document.getElementById('sec');
                let cU = document.createElement("tr");
                cU.innerHTML = `<td>${index}</td>
                <td>${value.userName}</td>
                <td>${value.fullName}</td>
                <td>${value.gmail}</td>
                <td>${value.repass}</td>  `;
                sec.appendChild(cU)
                return
            }
        })
    }catch(err){
        console.log(err)
        alert("possibly the prooblem is Fatch URL error or mongodb server off")
    }
}
getApi()

