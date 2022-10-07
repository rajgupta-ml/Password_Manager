const range = document.getElementById("Slider");
const output = document.getElementById("output");
const numberCheck = document.getElementById("checkbox1");
const CapitalCheck = document.getElementById("checkbox2");
const symbolsCheck = document.getElementById("checkbox3");
const letterCheck = document.getElementById("checkbox4");
const btnGeneratePass = document.getElementById("genPassSubmit");
const resultArea = document.getElementById("showArea");
const copy = document.getElementById("copy");
const close = document.getElementById("closeRegPass");
const popup = document.getElementById("generatePass");
const menuList = document.getElementById("list2");
output.innerHTML = range.value;
range.oninput = function(){
    output.innerHTML = this.value;
}

menuList.addEventListener("click", () => {
    popup.className = 'generatePassword';
})
close.addEventListener("click", () => {
    popup.className = 'notActive';
} )

btnGeneratePass.addEventListener("click", (e) => {
    const passlength = range.value;
    console.log(passlength);
    const checkArr = [{hasNumber: numberCheck.checked}, {hasCapital : CapitalCheck.checked},{hasSymbols: symbolsCheck.checked}, {hasLetter: letterCheck.checked}];
    const resultArr = [];
    let j = 0;
    for(let i = 0; i < checkArr.length; i++){
        if(Object.values(checkArr[i])[0] == true){
            resultArr[j] = Object.keys(checkArr[i])[0];
            j++;
        }
    }if(!resultArr.length){
        resultArea.innerHTML = "Check at least one option";
    }else{
        copy.innerHTML = "copy";
        resultArea.innerHTML = randomString(resultArr, passlength);
    }
    
});

copy.addEventListener("click" , () => {
    navigator.clipboard.writeText(resultArea.innerText);
    alert("Password copied to clipboard");
})



function generatePass(checkedOptions){
    let pass = "";
    if(checkedOptions == 'hasCapital'){ 
        pass = hasCapital();
    }else if(checkedOptions == 'hasSymbols'){
        pass = hasSymbols();
    }else if(checkedOptions == 'hasNumber'){
        pass = hasNumber();
    }else if(checkedOptions == 'hasLetter'){
        pass = hasLetter();
    }
    return pass;
}


function randomString(arr, size){
    let pw = "";
    for(let i = 0; i < size; i++){
        pw += generatePass(arr[Math.floor(Math.random() * arr.length)]);
    }
    return pw;
}



function hasLetter(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function hasCapital(){

    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function hasNumber(){
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function hasSymbols(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


