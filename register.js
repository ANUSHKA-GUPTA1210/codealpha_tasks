const form =
document.getElementById("registerForm");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const user = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        password:
        document.getElementById("password").value
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    window.location.href =
    "login.html";
});