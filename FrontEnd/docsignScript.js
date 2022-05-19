var submitBtn = document.getElementById("signBtn");
var fullName = document.getElementById("name");
var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");
var signPassR = document.getElementById("signPassR");

submitBtn.onclick = function(){
  console.log(fullName.value," ",signEmail.value);
  if(signPass.value !== signPassR.value){
    alert("Password Do Not Match");
    signPass.value = "";
    signPassR.value = "";
  }
  else{
    var object = {Key: signEmail.value, Detail: {Name: fullName.value, Password: signPass.value}};
    var request = new XMLHttpRequest();
    request.open("post", "/docsignup");
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(object));
    request.addEventListener("load", function(){
      var bool = request.responseText;
      if(bool == "Created"){
        alert("Id create now you can login");
      }
      else{
        alert("E-mail Id already used");
      }
    });
  }
}