import { toggle } from './toggle.js';
import {successPopup, errorPopup} from './popup.js';

//Validating the input fields
const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordTwo = document.getElementById('pass2');


   
let firstNameValue = '';
let lastNameValue = '';
let EmailValue = '';
let passwordValue = '';
let passwordTwoValue = '';

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    firstNameValue = firstName?.value.trim() || '';
    lastNameValue = lastName?.value.trim() || '';
    EmailValue = email?.value.trim()|| '';
    passwordValue = password?.value.trim() || '';
    passwordTwoValue = passwordTwo?.value.trim() || '';

    if(firstNameValue === ''){
        setErrorFor(firstName, 'FirstName Cannot be Blank');
    }else{
        setSuccessFor(firstName);
    }

    if(lastNameValue === ''){
        setErrorFor(lastName, 'LastName Cannot be Blank');
    }else{
        setSuccessFor(lastName);
    }

    if(EmailValue === ''){
        setErrorFor(email, 'Email Cannot be Blank');
    }else if(!isEmail(EmailValue)){
        setErrorFor(email, 'Not a valid email');
    }else{
        setSuccessFor(email);
    }

    if(passwordValue === ''){
        setErrorFor(password, 'Password cannot be blank');
    }else{
        setSuccessFor(password);
    }

    if(passwordTwoValue === ''){
        setErrorFor(passwordTwo, 'Password cannot be blank');
    }else if(passwordValue != passwordTwoValue){
        setErrorFor(password, 'Password does not match');
        setErrorFor(passwordTwo, 'Password does not match');
    }
    else{
        setSuccessFor(passwordTwo);
        sendAndGetDataFromBE();
        
    }
    
    
});

function setErrorFor(input,message)  {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'inputvar error';
}

function setSuccessFor(input){
    const formControl= input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'inputvar success';
    small.innerText = '';
    
}

 function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



async function sendAndGetDataFromBE(){
    //---------------------------------------------------------------------------------------------------
    const data = {firstNameValue, lastNameValue, EmailValue, passwordValue};  //creating the object 
    // the options of how i want to send the file
    const options ={
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    };
    //Getting the response from the backend and showing it on the front end
    const response = await fetch('/registration', options);
    const json = await response.json();

    if(json.success == 'false'){
        errorPopup();
        toggle();
    }else if(json.success == 'true'){
        successPopup();
        toggle();
    }
    // --------------------------------------------------------------------------------------------------
}





