import {loginErrorPopup, loginErrorPopupzNotPresent} from './popup.js'
import {loginToggle} from './toggle.js'
const loginForm = document.getElementById("loginform");
const InputEmail = document.getElementById("logemail");
const InputPassword = document.getElementById("logpassword");

let InputEmailValue = "";
let InputPasswordValue = "";

loginForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    InputEmailValue = InputEmail?.value.trim() || '';
    InputPasswordValue = InputPassword?.value.trim() || '';
    loginAuthWithDb();
    
});


async function loginAuthWithDb(){
    const data = {InputEmailValue, InputPasswordValue};

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    };
    const response = await fetch('/login', options);
    const json = await response.json();
    if(json.status == 'successfull'){
        window.sessionStorage.setItem("auth" , "1");
        window.sessionStorage.setItem("FirstName", json.firstName);
        window.sessionStorage.setItem("LastName", json.lastName);
        window.sessionStorage.setItem("Email", json.emailId);
        window.location.replace("/dashboard.html");
    }else if(json.status == 'failed'){
        loginErrorPopup();

    }else if(json.status == "notAvailabe"){
        loginErrorPopupzNotPresent();
        loginToggle();
    }
}