// Sugguestional Contents (add more if you can)
const tanzaniaLocations = [
  { name: "Arusha", type: "City" },
  { name: "Arusha", type: "Region" },
  { name: "Bunda", type: "Town" },
  { name: "Dar es Salaam", type: "City" },
  { name: "Dar es Salaam", type: "Region" },
  { name: "Dodoma", type: "City" },
  { name: "Dodoma", type: "Region" },
  { name: "Geita", type: "Region" },
  { name: "Handeni", type: "Town" },
  { name: "Hai", type: "Town" },
  { name: "Hidabaki", type: "Town" },
  { name: "Himo", type: "Town" },
  { name: "Hombolo", type: "Town" },
  { name: "Iringa", type: "City" },
  { name: "Iringa", type: "Region" },
  { name: "Kagera", type: "Region" },
  { name: "Karatu", type: "Town" },
  { name: "Katavi", type: "Region" },
  { name: "Katesh", type: "Town" },
  { name: "Kibondo", type: "Town" },
  { name: "Kigoma", type: "City" },
  { name: "Kigoma", type: "Region" },
  { name: "Kilimanjaro", type: "Region" },
  { name: "Kilosa", type: "Town" },
  { name: "Korogwe", type: "Town" },
  { name: "Lindi", type: "City" },
  { name: "Lindi", type: "Region" },
  { name: "Lushoto", type: "Town" },
  { name: "Makambako", type: "Town" },
  { name: "Manyara", type: "Region" },
  { name: "Mara", type: "Region" },
  { name: "Mbeya", type: "City" },
  { name: "Mbeya", type: "Region" },
  { name: "Morogoro", type: "City" },
  { name: "Morogoro", type: "Region" },
  { name: "Moshi", type: "City" },
  { name: "Mtwara", type: "City" },
  { name: "Mtwara", type: "Region" },
  { name: "Musoma", type: "City" },
  { name: "Mwanza", type: "City" },
  { name: "Mwanza", type: "Region" },
  { name: "Nanyumbu", type: "Town" },
  { name: "Njombe", type: "Region" },
  { name: "Pemba", type: "Island" },
  { name: "Pemba", type: "Region" },
  { name: "Pwani", type: "Region" },
  { name: "Rombo", type: "District" },
  { name: "Rufiji", type: "City" },
  { name: "Rukwa", type: "Region" },
  { name: "Ruvuma", type: "City" },
  { name: "Ruvuma", type: "Region" },
  { name: "Shinyanga", type: "City" },
  { name: "Shinyanga", type: "Region" },
  { name: "Simiyu", type: "Region" },
  { name: "Singida", type: "City" },
  { name: "Singida", type: "Region" },
  { name: "Songea", type: "City" },
  { name: "Sumbawanga", type: "City" },
  { name: "Tabora", type: "City" },
  { name: "Tabora", type: "Region" },
  { name: "Tanga", type: "City" },
  { name: "Tanga", type: "Region" },
  { name: "Usharika", type: "City" },
  { name: "Zanzibar", type: "Island" },
];

// Ijectional CSS for the suggestion container
const styles = `
.suggestions-container {
  position: relative;
  width: 90%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: none;
  z-index: 1000;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}

.suggestion-type {
  color: #666;
  font-size: 0.8em;
  margin-left: 8px;
}
`;

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const overlay = document.getElementById("loading-overlay");
    overlay.classList.add("hidden");
    overlay.addEventListener("transitionend", function () {
      overlay.remove();
    });
  }, 1000);
});

function updateweather(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  //date
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#weather-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon"/>`;

  let cityElement = document.querySelector("#weather-app-city");
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  cityElement.innerHTML = response.data.city;

  let searchButton = document.querySelector(".search-form-button");
  searchButton.innerHTML = "🔍 Search";
  searchButton.style.cursor = "pointer";
  searchButton.disabled = false;
}

function searchCity(city) {
  //make api and update the interface
  let apiKey = "0b784b548a99fteo7141a3d30034ab9f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // change search button
  let searchButton = document.querySelector(".search-form-button");
  searchButton.innerHTML = "<div class='loaderTwo'></div>";
  searchButton.style.cursor = "progress";
  searchButton.disabled = true;
  axios.get(apiUrl).then(updateweather);
}

function formatDate(date) {
  // Input validation
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date input");
  }

  // Array of day names - moved outside function for better performance
  // if this function is called multiple times
  const DAYS = Object.freeze([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  // Use padStart for consistent padding of numbers
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = DAYS[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Create suggestions container
const suggestionsContainer = document.createElement("div");
suggestionsContainer.className = "suggestions-container";
document
  .querySelector(".search-form-input")
  .insertAdjacentElement("afterend", suggestionsContainer);

const searchInput = document.getElementById("search-form-input");

function showSuggestions(inputValue) {
  const filteredLocations = tanzaniaLocations
    .filter((location) =>
      location.name.toLowerCase().startsWith(inputValue.toLowerCase())
    )
    .slice(0, 5);

  if (filteredLocations.length > 0) {
    suggestionsContainer.innerHTML = filteredLocations
      .map(
        (location) =>
          `<div class="suggestion-item" tabindex="0">${location.name}<span class="suggestion-type">${location.type}</span></div>`
      )
      .join("");
    suggestionsContainer.style.display = "block";
  } else {
    suggestionsContainer.style.display = "none";
  }
}

// Input event listener
searchInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.trim();
  if (inputValue) {
    showSuggestions(inputValue);
  } else {
    suggestionsContainer.style.display = "none";
  }
});

// Click event listener for suggestions
suggestionsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion-item")) {
    searchInput.value = e.target.textContent
      .replace(e.target.querySelector(".suggestion-type").textContent, "")
      .trim();
    suggestionsContainer.style.display = "none";
  }
});

// Close suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (
    !searchInput.contains(e.target) &&
    !suggestionsContainer.contains(e.target)
  ) {
    suggestionsContainer.style.display = "none";
  }
});

// Handle keyboard navigation
searchInput.addEventListener("keydown", (e) => {
  const suggestions = suggestionsContainer.querySelectorAll(".suggestion-item");
  const currentIndex = Array.from(suggestions).findIndex(
    (item) => item === document.activeElement
  );

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      if (suggestionsContainer.style.display === "block") {
        if (currentIndex < 0) {
          suggestions[0]?.focus();
        } else {
          suggestions[
            Math.min(currentIndex + 1, suggestions.length - 1)
          ]?.focus();
        }
      }
      break;

    case "ArrowUp":
      e.preventDefault();
      if (suggestionsContainer.style.display === "block") {
        if (currentIndex > 0) {
          suggestions[currentIndex - 1]?.focus();
        }
      }
      break;

    case "Enter":
      if (document.activeElement.classList.contains("suggestion-item")) {
        searchInput.value = document.activeElement.textContent
          .replace(
            document.activeElement.querySelector(".suggestion-type")
              .textContent,
            ""
          )
          .trim();
        suggestionsContainer.style.display = "none";
      }
      break;

    case "Escape":
      suggestionsContainer.style.display = "none";
      searchInput.focus();
      break;
  }
});

(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        // OpenCage API key =) (I know I should hide this or something, but its for learning purpose)
        let apiKey = "c9e589d80fc640739c1330d7f11fbee8";
        let api_url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

        fetch(api_url)
          .then((response) => response.json())
          .then((data) => {
            // Extracting city from the response
            let city =
              data.results[0].components.city ||
              data.results[0].components.town;

            // Get the city weather
            searchCity(city);
          })
          .catch((error) =>
            console.log("Error fetching geolocation data:", error)
          );
      },
      function (error) {
        console.log("Error getting location:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
})();
