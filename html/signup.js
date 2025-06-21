const login = document.getElementById("Login");
const register = document.getElementById("register");
const btn = document.querySelector(".btn");
const registbtn = document.querySelector(".register-btn");
const loginbtn = document.querySelector(".login-btn");

registbtn.addEventListener("click", function () {
    login.style.left = "-400px";  // Moves login form out of view
    register.style.left = "50px"; // Moves register form into view
    btn.style.left = "110px"; // Moves the button indicator
});

loginbtn.addEventListener("click", function () {
    login.style.left = "50px"; // Moves login form into view
    register.style.left = "450px"; // Moves register form out of view
    btn.style.left = "0"; // Moves the button indicator
});
