const form = document.getElementById("form");
const webName = document.getElementById("websiteName");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirmPassword");
const emailId = document.getElementById("emailId");
const RegUserDetails = document.getElementById('RegisterUserDetailsPopup');
const emailIdFK = window.sessionStorage.getItem("Email");
const tableData = document.getElementById("tableData");

form.addEventListener("submit", (e) => {
    const webNameValue = webName?.value.trim() || ""; 
    const passwordValue = password?.value.trim() || ""; 
    const confirmPassValue = confirmPass?.value.trim() || "";
    const emailIdValue = emailId?.value.trim() || "";
    sendDataToTheBE(webNameValue,emailIdValue, passwordValue, emailIdFK);
});


async function sendDataToTheBE(webName,emailId, pass, emailFk){
    const data = {webName ,emailId, pass,emailFk};
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    };
    const response = await fetch("/UserDetails", options);
    const json = await response.json();
    console.log(json.stats);
    if(json.stats == 'success') {
        RegUserDetails.className ="RegisterUserDetails";
    }else{
        console.log(json.stats);
    }

}

window.onload = () =>{
    getData();
    let nameId = document.getElementById('welcome_name');
    let firstname = window.sessionStorage.getItem("FirstName");
    let Lastname = window.sessionStorage.getItem("LastName");
    nameId.innerText = firstname + " " + Lastname; 
}

//Table Data
async function getData(){
    const data = {emailIdFK};

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    };
    const response = await fetch("/getData", options);
    const json = await response.json();
    if(json.status == 'False'){
        tableData.innerHTML = "There are No password to be showed";
    }else if(json.status == "True"){
       createTable(json);
       setTimeout(showElement, 300);
    }
    
}

let passwordArray = [];
function createTable(data){
    let pass = 0;
    
    for(const obj of data.response){
        passwordArray[pass] = obj.Password;
        tableData.innerHTML += `
        <tr class = "tableRow">
            <td class = "name">${obj.websiteName}</td>
            <td>${obj.Email}</td>
            <td id = "${"pass"+ pass}">${data.pass}</td>
            <div class = "moreList">
            <td class = "rowMenu">
                <img src = "Images/view.png" class = "more showPassword" id = ${"view" + pass} />
                <img src = "Images/bin.png" class = "more deletePassword" id = ${"delete" + pass} />
            </td>
            </div>
        </tr>
    `;
    pass++;
    }
}

// console.log(passwordArray);

function showElement() {
   const tableData = document.getElementById("tableData");
   let check = false;
   tableData.addEventListener("click", (e) => {
        if(e.target.className == "more showPassword"){
            
            const btnId = e.target.id;
            const lastNum = btnId.charAt(btnId.length-1);
            const passId = "pass" + lastNum; 
            const passChange = document.getElementById(passId);
            if(check == false){
                check = true;
                const pass = decrypt(lastNum).then(decryptPass => {
                    passChange.innerHTML = decryptPass.res;
                });
                
            }else if(check == true){
                check = false;
                passChange.innerHTML = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            }

        }
   });
}

async function decrypt(index){
    const data = {passwordArray, index, emailIdFK};
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    };
    const response = await fetch("/decrypt", options);
    const json = await response.json();

    return json;
    
}


tableData.addEventListener("click", (e) =>{
    if(e.target.className == "more deletePassword"){
        const btnId = e.target.id;
        const lastNum = btnId.charAt(btnId.length-1);
        delte(lastNum).then(res => {
            if(res.status == "success"){
                location.reload();
            } 
        });
    }
});


async function delte(index){
    const data = {passwordArray, index};
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    };
    const response = await fetch("/delete", options);
    const json = await response.json();
    return json;
}