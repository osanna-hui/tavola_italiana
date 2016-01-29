$(document).ready(function(){
	"use strict";
    var user = document.getElementById('user');
    var pass = document.getElementById('pass');
    
    var userCheck = false;
    var passCheck = false;
    
//LOGIN VALIDATION
	user.onchange = function(){
		var userVal = user.value;
		if(userVal === ""){
			document.getElementById('userError').textContent = "Please enter your username.";
			user.style.border = "solid 2px blue";
			user.autofoucus = "autofocus";
		} else if(userVal.match(/\s/g)){
			document.getElementById('userError').textContent = "No spaces in the username.";
			user.style.border = "solid 2px blue";
			user.autofoucus = "autofocus";
		} else {
			document.getElementById('userError').innerHTML = "";
			userCheck = true;
			user.style.border = "inset 2px";
		}
		console.log(userCheck);
	};
    
	pass.onchange = function(){
		var passVal = pass.value;
		if (passVal === ""){
			document.getElementById('passError').textContent = "Please enter your password.";
			pass.style.border = "solid 2px blue";
			passCheck = false;
			
		} else if(passVal.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,20}$/)){
			document.getElementById('passError').innerHTML = "";
			pass.style.border = "inset 2px";
		} else {
            document.getElementById('passError').textContent = "Password must be 6~20 characters, with at least one letter and one number.";
            pass.style.border = "solid 2px blue";
            passCheck = false;
        }
		console.log(passCheck);
    };
});