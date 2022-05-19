var loginBtn = document.getElementById("loginBtn");
console.log("Connected");
var account = document.getElementById("account")
console.log(account, loginBtn);
// var body = document.getElementById("bod");
loginBtn.onclick = function(event){
  
  var username = document.getElementById("loginUser");
  var password = document.getElementById("loginPass");
  // console.log("logged in ", username.value," ", password.value);
  
  var object = {Username: username.value, Password: password.value};
  var request = new XMLHttpRequest();
  request.open("post", "/login");
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(object));
  request.addEventListener("load", function(){
    var res = JSON.parse(request.responseText);
    if(res[0] == 0){
      alert("Username does not exist, Please try again");
      username.value = "";
      password.value = "";
    }
    else if(res[0] == 1){
      alert("Password do not match, Please try again");
      password.value = "";
    }
    else{
      alert("logged in");
      username.value = "";
      password.value = "";
      window.location.href = "https://doctorappointment-3p34g81bdtyl3a8zuu2.codequotient.in/account.html?name="+res[1];
      // account.innerHTML = res[1];
    }
  });
}