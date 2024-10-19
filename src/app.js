function updateweather(response) {
    let temperatureElement = document.querySelector("#temp-value");
    let temperature = response.data.temperature.current
    temperatureElement.innerHTML = Math.round(temperature) ;
    
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");

    //date
    let date = new Date(response.data.time * 1000);

    let iconElement = document.querySelector("#weather-icon");
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon"/>`

    let cityElement = document.querySelector("#weather-app-city");
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    cityElement.innerHTML = response.data.city;
}

function searchCity(city){
    //make api and update the interface
    let apiKey = "0b784b548a99fteo7141a3d30034ab9f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateweather);
}

function formatDate(date){
    
    let minutes= date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[date.getDay()];

    if(minutes<10){
        minutes = `0${minutes}`;
    }
    return `${day} ${hours} ${minutes}`;
}
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);

searchCity("Dar es Salaam");