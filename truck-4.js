document.addEventListener("DOMContentLoaded", function(){
    let selectedTruck = null;
    let selectedTruckImage = null;
    let selectedTruckId = null;
    
    
    let truckOptions = document.querySelectorAll(".truck-option");
    let proceedBtn = document.getElementById("proceedBtn");
    let viewBtn = document.getElementById("viewBtn"); 
    proceedBtn.disabled = true; 

    truckOptions.forEach(truck => {
        truck.addEventListener("click", function () {
            // Remove 'selected' class from all trucks and add to the clicked one
            truckOptions.forEach(t => t.classList.remove("selected"));
            this.classList.add("selected");


            selectedTruck = this.getAttribute("data-truck");
            selectedTruckImage = this.querySelector("img").src; 
            selectedTruckId = this.getAttribute("data-id");

            proceedBtn.disabled = false;
            
        });
    });

    proceedBtn.addEventListener("click", function(){
        if (selectedTruck){
            localStorage.setItem("selectedTruckId",selectedTruckId)
            window.location.href = "truck-details.html";
        }
    });
    if(viewBtn){
    viewBtn.addEventListener("click", function(){
        if (selectedTruck || selectedTruckImage || selectedTruckId){
            localStorage.setItem("selectedTruckId", selectedTruckId);
            
        window.location.href = "truck-details.html";
    }else{
        alert("Please select a truck before viewing details.")
    }
    });
    }
});