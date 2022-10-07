const opacity_PopUp = document.getElementById("opacity_popup");
const btnCancel = document.getElementById('btnCancel');
const headingPopup = document.getElementById('heading');
const paraPopup = document.getElementById('para');
const imgPopup = document.getElementById('imgPopup');
const closeBtn = document.getElementById("realBtn");

export function errorPopup(){
    opacity_PopUp.className = 'opacity error';
    headingPopup.innerHTML = "Oh snap!";
    paraPopup.innerHTML = "This username or password is already present";
    btnCancel.className ="btnCancelError";
    imgPopup.src = "Images/warning.png";
}

export function successPopup(){
    opacity_PopUp.className = 'opacity error';
    imgPopup.src = "Images/checked.png";
    headingPopup.innerHTML = "Oh Yes!";
    paraPopup.innerHTML = "Registration Succesful";
    btnCancel.className ="btnCancelSuccess";
}
export function loginErrorPopup(){
    opacity_PopUp.className = 'opacity error';
    headingPopup.innerHTML = "Oh snap!";
    paraPopup.innerHTML = "This Email and password combination is wrong";
    btnCancel.className ="btnCancelError";
    imgPopup.src = "Images/warning.png";
}
export function loginErrorPopupzNotPresent(){
    opacity_PopUp.className = 'opacity error';
    headingPopup.innerHTML = "Oh snap!";
    paraPopup.innerHTML = "This Email is not registered";
    btnCancel.className ="btnCancelError";
    imgPopup.src = "Images/warning.png";
}
closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    opacity_PopUp.className = 'opacity';
});
    