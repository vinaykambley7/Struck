let textInputEl = document.getElementById("textIinput");
let passwordEl = document.getElementById("password");
let ErrMsgEl = document.getElementById("ErrMsg");
let pasErrMsgEl = document.getElementById("pasErrMsg");
let formCoEl = document.getElementById("formCo");
let formData = {
    email: "",
    password: ""
}


textInputEl.addEventListener("input", function(event) {
    formData.email = event.target.value.trim();
    ErrMsgEl.textContent = formData.email === "" ? "Enter an Email" : "";
});

passwordEl.addEventListener("input", function(event) {
    formData.password = event.target.value.trim();
    pasErrMsgEl.textContent = formData.password === "" ? "Enter a Password" : "";
});


function submitForm() {
    
    let isValid = true;

    if (formData.email === "") {
        ErrMsgEl.textContent = "Enter an Email*";
        isValid = false;
    }
    else{
        ErrMsgEl.textContent = "";
    }
    if (formData.password === "") {
        pasErrMsgEl.textContent = "Enter a Password*";
        isValid = false;
    }
    else{
        pasErrMsgEl.textContent = "";
    }
    if (isValid){
        let storedEmail = localStorage.getItem("registeredEmail");
        let storedPassword = localStorage.getItem("registeredPassword");
        
        let enteredEmail = formData.email.trim().toLowerCase();
        let enteredPassword = formData.password.trim();

        if (enteredEmail === storedEmail && enteredPassword === storedPassword){
            alert("Login Successful!");
            window.location.href = "truck-4.html";
        } else {
            ErrMsgEl.textContent = "Invalid email or password!";
            pasErrMsgEl.textContent = "";

        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    let registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function (event) {
            event.preventDefault(); 
            window.location.href = "truck-6.html"; // Redirect to Registration Page
        });
    }
});


formCoEl.addEventListener('submit', function(event) {
    event.preventDefault();
    submitForm();
})