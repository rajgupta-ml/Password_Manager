import { authentication, logout } from './auth.js';
authentication();

const logoutDash = document.getElementById("logout");

logoutDash.addEventListener("click", (e) => {
    logout();
});