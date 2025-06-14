    document.addEventListener("DOMContentLoaded", function() {


    let form = document.getElementById("registerForm");
    let usernameEl = document.getElementById("username");
    let emailEl = document.getElementById("email");
    let passwordEl = document.getElementById("password");


    let usernameError = document.getElementById("usernameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");


    
    form.addEventListener("submit", function(event){
        event.preventDefault();


        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";

        let isValid = true;


        if (usernameEl.value.trim() === "") {
            usernameError.textContent = "Username is required!";
            isValid = false;
        }

    
        if (emailEl.value.trim() === "") {
            emailError.textContent = "Email is required!";
            isValid = false;
        } else if (!emailEl.value.includes("@") || !emailEl.value.includes(".")) {
            emailError.textContent = "Enter a valid email address!";
            isValid = false;
        }
        if (passwordEl.value.trim() === ""){
            passwordError.textContent = "Password is required!";
            isValid = false;
        }else if (passwordEl.value.length < 6){
            passwordError.textContent = "Password must be at least 6 characters!";
            isValid = false;
        }

        if (isValid){
            localStorage.setItem("registeredUsername", usernameEl.value.trim());

            localStorage.setItem("registeredEmail", emailEl.value.trim().toLowerCase());
            localStorage.setItem("registeredPassword", passwordEl.value.trim());



            alert("Registration successful! Please log in.");
            window.location.href = "truck-3.html";
        }
    });
    
});
