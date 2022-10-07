const signupbtn = document.querySelector(".rightbtn");
const loginbtn = document.querySelector(".leftbtn");
const movebtn = document.querySelector(".movebtn");
const loginform = document.querySelector(".js-form-login");
const signupform = document.querySelector(".js-form-signup");
const lnk = document.querySelector(".lnk");

export function toggle(){
    movebtn.classList.add("selected");
    loginform.classList.add("login-form");
    signupform.classList.remove("signup-form");
    movebtn.innerHTML="Sign In";
}

export function loginToggle(){
    movebtn.classList.remove("selected");
    loginform.classList.remove("login-form");
    signupform.classList.add("signup-form");
    movebtn.innerHTML="Sign Up";
}
loginbtn.addEventListener("click",()=>{
    movebtn.classList.add("selected");
    loginform.classList.add("login-form");
    signupform.classList.remove("signup-form");
    movebtn.innerHTML="Sign In";

})

signupbtn.addEventListener("click",()=>{
    movebtn.classList.remove("selected");
    loginform.classList.remove("login-form");
    signupform.classList.add("signup-form");
    movebtn.innerHTML="Sign Up";
})
lnk.addEventListener("click", ()=>{
    movebtn.classList.add("selected");
    loginform.classList.add("login-form");
    signupform.classList.remove("signup-form");
    movebtn.innerHTML="Sign In";
})