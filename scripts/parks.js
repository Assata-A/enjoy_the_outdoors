document.addEventListener("DOMContentLoaded", () => {
    // function that creates an option element
    
    function option(text) {
        const o = document.createElement("option");
        o.innerText = text;
        return o; 
    }

   //
    const locationSelect = document.getElementById("location");
    locationsArray.forEach(e => {
        let optionElement = option(e);
        locationSelect.append(optionElement);
    });

    // Populate park types select
    const parkTypesSelect = document.getElementById("parkTypes");
    parkTypesArray.forEach(e => {
        let optionElement = option(e);
        parkTypesSelect.append(optionElement);
    });

    // creates park info element
    function parkInfo(park) {
        const dElement = document.createElement("div");
        dElement.classList.add("park");
        dElement.innerHTML = `
            <hr>
            <h3>${park.LocationName}</h3>
            <h4>${park.LocationID}</h4>
            <div>${park.State}</div>
        `;
        if (park.hasOwnProperty("Visit")) {
            const link = park.Visit;
            const text = park.LocationName;
            dElement.innerHTML += `
                <div><a href="${link}" class="parkSite">${text}</a></div>
            `;
        }
        return dElement;
    }

    //function that displays filtered parks
    function displayInfo() {
        let filtered = [];
        if (locationRadio.checked) {
            filtered = nationalParksArray.filter(
                o => o.State.toUpperCase() === locationSelect.value.toUpperCase()
            );
        } else {
            filtered = nationalParksArray.filter(
                o => o.LocationName.toUpperCase().includes(
                    parkTypesSelect.value.toUpperCase()
                )
            );
        }
        results.innerHTML = "";
        filtered.forEach(p => results.appendChild(parkInfo(p)));
    }

    // listeners for filters
    locationSelect.addEventListener("change", displayInfo);
    parkTypesSelect.addEventListener("change", displayInfo);

    // Function to toggle search options
    function SearchBy() {
        results.innerHTML = ""; // Clear the results
        locationSelect.value = "SELECT LOCATION"; // Reset the location select
        parkTypesSelect.value = "SELECT PARK TYPE"; // Reset the park types select
        
        if (locationRadio.checked) {
            parkTypeLabel.style.display = "none";
            parkTypes.style.display = "none";
            locationLabel.style.display = "block";
            locationSelect.style.display = "block";

          
        } else if (parkTypeRadio.checked) {
            locationSelect.style.display = "none";
            locationLabel.style.display = "none";
            parkTypes.style.display = "block";
            parkTypeLabel.style.display = "block";
    
        } else {
            locationSelect.style.display = "block";
            locationLabel.style.display = "block";
            parkTypes.style.display = "block";
            parkTypeLabel.style.display = "block";
    
        }
        displayInfo();
    }




    locationRadio.addEventListener("click", SearchBy);
    parkTypeRadio.addEventListener("click", SearchBy);



    // Initialize with current selection
    SearchBy();
});