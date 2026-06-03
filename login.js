const form =
document.getElementById("loginForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
    document.getElementById("email")
    .value
    .trim();

    const password =
    document.getElementById("password")
    .value
    .trim();

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    // User registered nahi hai
    if (!user) {

        alert(
            "No account found! Please register first."
        );

        window.location.href =
        "register.html";

        return;
    }

    // Empty fields check
    if (email === "" || password === "") {

        alert(
            "Please fill all fields."
        );

        return;
    }

    // Login success
    if (
        user.email === email &&
        user.password === password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        alert(
            "Login Successful!"
        );

        window.location.href =
        "index.html";
    }

    // Wrong credentials
    else {

        alert(
            "Incorrect Email or Password"
        );
    }

});