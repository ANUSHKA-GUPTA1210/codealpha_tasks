document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.id) {
        localStorage.setItem("user", JSON.stringify(data));
        alert("Login Successful");
        window.location.href = "index.html";
    } else {
        alert(data.message);
    }
});