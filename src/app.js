function updateweather(response) {
    let temperatureElement = document.querySelector("#temp-value");
    let temperature = response.data.temperature.current
    temperatureElement.innerHTML = Math.round(temperature) ;

    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = response.data.city;
}

function searchCity(city){
    //make api and update the interface
    let apiKey = "0b784b548a99fteo7141a3d30034ab9f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateweather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);

searchCity("Dar es Salaam");