document.addEventListener("DOMContentLoaded", function() {
    let paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    let paymentForm = document.getElementById("paymentForm");
    let paymentMessage = document.getElementById("paymentMessage");
    paymentOptions.forEach(option => {
        option.addEventListener("change", function() {
            document.querySelectorAll(".payment-section").forEach(section => {
                section.style.display = "none"; // Hide all sections first
            });
            let messageBox = document.getElementById("successMessage");
            if(messageBox){
                messageBox.innerHTML = "";
                messageBox.classList.remove("show");
            }

            let selectedMethod = this.value;
            if (selectedMethod === "upi") {

                document.getElementById("upiSection").style.display = "block"; // Show UPI section
            } else if (selectedMethod === "card") {
                document.getElementById("cardSection").style.display = "block"; // Show Card section
            } else if (selectedMethod === "cash") {
                document.getElementById("cashSection").style.display = "block"; // Show Cash section
            }
        });
    });

    paymentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedMethod) {
            alert("Please select a payment method.");
            return;
        }
        let HomeButton = document.createElement("button");
            HomeButton.textContent = "Go to Home";
            HomeButton.style.display = "Block";
           
            HomeButton.style.padding = "5PX";
            HomeButton.style.borderRadius = "6px";
            HomeButton.style.cursor = "pointer";
            HomeButton.style.backgroundSize = "20px";
            HomeButton.style.margin ="10px";  
            HomeButton.style.color = "#ffffff";
            HomeButton.classList.add("btn", "btn-primary");
            HomeButton.classList.add("small-btn");



            HomeButton.addEventListener("click", function(){
                window.location.href= "truck-4.html";
            })
            let messageBox = document.getElementById("successMessage");
            if (!messageBox) {
                messageBox = document.createElement("div");
                messageBox.id = "successMessage";
                messageBox.classList.add("show");
                paymentForm.parentNode.appendChild(messageBox);
            }
           

        let isvalid = true;
        if (selectedMethod.value === "upi") {
            let upiId = document.getElementById("upiId").value.trim();
            let upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
         
            if (!upiPattern.test(upiId)) {
                alert("Invalid UPI ID. Please enter a valid format (e.g., user@upi).");
                return;
            }
          
            let  messageBox = document.getElementById("successMessage");
            if (!messageBox) {
                messageBox = document.createElement("div");
                messageBox.id = "successMessage"
                messageBox.classList.add("show");
                paymentForm.parentNode.appendChild(messageBox);
                   
               
            }
            
            paymentMessage.textContent = "!Almost done! Approve the payment in your UPI app"
            paymentMessage.classList.add("show");
            paymentMessage.appendChild(HomeButton);
          


        } else if (selectedMethod.value === "card") {
            let cardNumber = document.getElementById("cardNumber").value.trim().replace(/\s/g, "");
            let cardHolderName = document.getElementById("cardHolder").value.trim();
            let expiry = document.getElementById("expiry").value.trim();
            let cvv = document.getElementById("cvv").value.trim();
            let cardPattern = /^\d{16}$/; // 16-digit card number
            let cvvPattern = /^\d{3,4}$/; // 3 or 4-digit CVV
            let cardHolder = /^[a-zA-Z ]{2,50}$/; // Allows only letters and spaces (2 to 50 characters)
            if (!cardHolder.test(cardHolderName)) {
                alert("Invalid Card Holder Name. It should only contain letters and spaces.");
                return;
            }
            if (!cardPattern.test(cardNumber)) {
                alert("Invalid Card Number. It should be 16 digits.");
                return
            }
            if (!cvvPattern.test(cvv)) {
                alert("Invalid CVV. It should be 3 or 4 digits.");
                return
            }
            if (!expiry) {
                alert("Please enter the card expiry date.");
                return;
            }
            //import logic 
        //cardHolder.test(cardHolderName) returns true if the name is valid
        //!cardHolder.test(cardHolderName) is false if the name is valid
        //If the name is valid, the if condition is false, so it does not enter the block
        //The script continues to the next check
        // If any check fails (return; is hit), execution stops, and "Payment successful!" never runs.
        

       
            //Since no two conditions are true at the same time, there's no need for else
            
            paymentMessage.style.color = "green";
            let messageBox = document.getElementById("successMessage");
              if (!messageBox){
                messageBox = document.createElement("div");
                messageBox.id = "successMessage"
                messageBox.classList.add("show");
                paymentForm.parentNode.appendChild(messageBox);
        }
            paymentMessage.textContent = "Truck Booked Successfully!"
            paymentMessage.classList.add("show");
            paymentMessage.appendChild(HomeButton);
                // Hide automatically after 3 seconds
                setTimeout(() => {
                    messageBox.classList.remove("show");
                },10000);
            
    }else if (selectedMethod.value === "cash") {
             
            
                let messageBox = document.getElementById("successMessage");
                
                if(!messageBox){
                    messageBox = document.createElement("div");
                    messageBox.id = "successMessage";
                    messageBox.classList.add("show");
                    document.body.appendChild(messageBox);
                }

                paymentMessage.textContent = "Truck Booked Successfully!"
            paymentMessage.classList.add("show");
            paymentMessage.appendChild(HomeButton);
                
            
                // Hide automatically after 3 seconds
                setTimeout(() => {
                    messageBox.classList.add("show");
                },10000);
        
                
            
            
            
        }


    });
});
