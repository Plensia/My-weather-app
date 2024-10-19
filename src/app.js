function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = searchInput.value;
}


let searchFormelement = document.querySelector("#search-from");
searchFormelement.addEventListener("submit", handleSearchSubmit);