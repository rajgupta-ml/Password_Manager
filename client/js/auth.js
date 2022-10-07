export function authentication(){
    const auth = window.sessionStorage.getItem("auth");
    if(auth != 1){
        window.location.replace("/");
    }else{
    }
}

export function logout(){
    sessionStorage.clear();
    window.location.replace("/");
}