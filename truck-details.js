document.addEventListener("DOMContentLoaded", function(){
    let selectedTruckId = localStorage.getItem("selectedTruckId");
    let totalCost = 0;
    const truckData = {
        "1" :{
            name: "Elicher",
            mainImage: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1710075894/IMG_1780_qnls7g.jpg",
            image: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1698585672/95366fabfdb7dec2b94277862078ed51_phg2yf.jpg",
            description: "This 16 tyres model has made a special demand in market with its high fuel efficiency.",
            specs: [
                "Pay Load Capacity : 10572 Kgs",
                "Engine : VEDX8-6 Cylinder 7.7L",
                "Mileage : 2.5-3.5 KMPL*",
                "Vechile No : Ap098nm1"
            ], priceperkm: 60
        },
         "2": {
            name: "Bharath Benz",
            mainImage: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1710075894/IMG_1780_qnls7g.jpg",
            image: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1698602906/bharat-benz-5528t-13046_nn7b4h.webp",
            description: "A powerful truck for heavy loads.",
            specs: [
                "Pay Load Capacity : 12000 Kgs",
                "Engine : 6-Cylinder Turbocharged",
                "Mileage : 3.0-4.5 KMPL*",
                "Vechile No : Ap098nm1"
            ], priceperkm:50
        },"3": {
            name: "Mahindhra Blazo",
            mainImage: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1710075894/IMG_1780_qnls7g.jpg",
            image: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1698602932/mahindra_sr2p09.jpg",
            description: "Mahindra Blazo X 46 is the new 45000kg tractor . It has mPOWER 7.2 Liter Fuel Smart engine BS6 7200cc",
            specs: [
                "pay Load capacity :34000 Kgs",
                "Engine :mPower 7.2 litre FuelSmart",
                "Mileage : 5 kmpl",
                "Vechile No : Ap098nm1"
            ],  priceperkm:40
        },
        "4": {
            name: "Ashok Leyland",
            mainImage: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1710075894/IMG_1780_qnls7g.jpg",
            image: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1698688385/partner-4-tyre-1614064550_nwh81q.jpg",
            description: "Ashok Leyland Partner has a ZD30 Diesel engine with DDTi, producing 140 HP max power for higher speed.",
            specs: [
                "pay Load capacity :3760 KG",
                "Engine :ZD30 Diesel engine with DDTi",
                "Mileage :7 KMPL",
                "Vechile No : Ap098nm1"
            ],  priceperkm:40
        },"5": {
            name: "Bajaj Maxima",
            mainImage: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1710075894/IMG_1780_qnls7g.jpg",
            image: "https://res.cloudinary.com/dmy7kknrc/image/upload/v1709627968/auto_c2ehkf.jpg",
            description: "Bajaj Maxima Yellow C Cargo Diesel Truck is a diesel truck with a capacity of 4.5 tons, which is built for professional use",
            specs: [
                "pay Load capacity :619 Kgs",
                "Engine :236.2 cc",
                "Mileage :35 kmpl",
                "Vechile No : Ap098nm1"
            ], priceperkm:35
        },
        
        
        
        
    };


    function initAutocomplete(){
        new google.maps.places.Autocomplete(document.getElementById("pickupLocation"));
        new google.maps.places.Autocomplete(document.getElementById("dropoffLocation"));

     }
      function calculateDistance(){
        const origin = document.getElementById("pickupLocation").value.trim();
        const destination = document.getElementById("dropoffLocation").value.trim();


        if(!origin || !destination){
            alert("Please enter both pickup and drop-off locations.")
            return;
        }



        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
            origins : [origin],
            destinations : [destination],
            travelMode: google.maps.TravelMode.DRIVING
        }, 
        function(response, status){
            if (status === "OK"){

             let distanceElement = response.rows[0].elements[0];
             if (distanceElement.status === "OK"){
                let distanceText = distanceElement.distance.text;
                let distanceValue = distanceElement.distance.value/1000;
                document.getElementById("distancekm").value = distanceValue.toFixed(2) + "km";

                if(selectedTruckId && truckData[selectedTruckId]){
                    let truck = truckData[selectedTruckId];

                    totalCost = (distanceValue * truck.priceperkm).toFixed(2);
                    document.getElementById("totalCost").textContent = `Total price: ₹${totalCost}`;
                    localStorage.setItem("totalPrice", totalCost);
                }
             } else{
                alert("🚨 Distance calculation failed: " + distanceElement.status);
             }
            
            
            } else {
                alert("Error: " + status)
            }
        }
    );
      }
    if(selectedTruckId && truckData[selectedTruckId]){
        let truck = truckData[selectedTruckId];

        document.getElementById("truckImage1").src = truck.image;
        document.getElementById("truckName").textContent = truck.name;
        document.getElementById("truckDescription").textContent = truck.description;
        let specsList = document.getElementById("truckSpecs");
        specsList.innerHTML = ""; 
        truck.specs.forEach(spec =>{
            let li = document.createElement("li");
            li.textContent = spec;
            specsList.appendChild(li);
        });

        document.getElementById("proccedbtn").addEventListener("click", function(event){
        event.preventDefault();
       
        let pickupLocation = document.getElementById("pickupLocation").value.trim();
        let dropoffLocation = document.getElementById("dropoffLocation").value.trim();
        let bookingDateTime = document.getElementById("bookingDateTime").value.trim();
        let numTrucks = parseInt(document.getElementById("numTrucks").value.trim());
        let customerName = document.getElementById("customerName").value.trim();
        let customerContact = document.getElementById("customerContact").value.trim();

        if (!pickupLocation || !dropoffLocation || !bookingDateTime||isNaN(numTrucks) || numTrucks <= 0 || !customerName || !customerContact){
            alert("🚨 Please fill in all required fields before proceeding.");
            return;
        }
        
        let bokingdetails = {
            truckId :selectedTruckId ,
            pickupLocation,
                dropoffLocation,
                bookingDateTime,
                numTrucks,
                customerName,
                customerContact,
                totalCost
                

        };
         localStorage.setItem("bokingdetails", JSON.stringify(bokingdetails));
         window.location.href = "truck-payment.html"
    });
}else {
    alert("No truck details found. Please select a truck first.");
    window.location.href = "index.html"; // Redirect back to selection page
}
document.getElementById("calculateDistanceBtn").addEventListener("click", calculateDistance);
window.addEventListener("load", initAutocomplete);
});

