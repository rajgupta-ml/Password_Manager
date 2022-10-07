const addNew = document.getElementById('addNew');
const RegUserDetails = document.getElementById('RegisterUserDetailsPopup');
const close = document.getElementById('closeBtn');
const delte = document.getElementById('Delete');

addNew.addEventListener('click', (e) => {
    RegUserDetails.className = "active";
})

close.addEventListener('click', (e) => {
    RegUserDetails.className ="RegisterUserDetails"
})



