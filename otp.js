document.addEventListener("DOMContentLoaded", function () {
    let otpInput = document.getElementById("text-input3");
    let loginButton = document.getElementById("otpLoginBtn");
    let errorMsg = document.createElement("p"); 
    errorMsg.style.color = "red";
    errorMsg.style.fontWeight = "bold";
    otpInput.parentNode.appendChild(errorMsg); 

    const correctOTP = "1234"; 

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); 

        if (otpInput.value.trim() === correctOTP) {
            window.location.href = "truck-4.html"; 
        } else {
            errorMsg.textContent = "Invalid OTP. Try again!";
        }
    });
});
