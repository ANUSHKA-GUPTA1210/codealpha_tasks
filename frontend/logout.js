const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        const confirmLogout =
        confirm(
        "Are you sure you want to logout?"
        );

        if(!confirmLogout){
            return;
        }

        localStorage.removeItem(
        "isLoggedIn"
        );

        alert(
        "Logged Out Successfully!"
        );

        window.location.href =
        "login.html";
    });

}