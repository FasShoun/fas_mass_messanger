const alert = document.getElementById('alert')
 const nameErr = document.getElementById('nameErr');
 const gmailErr = document.getElementById('gmailErr');
 setTimeout(()=>{
   if(alert){
     alert.style.display = "none";
   }else if(nameErr || gmailErr){
    nameErr.style.display = "none";
    gmailErr.style.display = 'none';
   }
  },5000)
