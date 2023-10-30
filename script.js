const apiKey = '7c49243708cc8776a258dc31b59da5f5'; // Your provided API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to save a city to localStorage
function saveCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
}

// Function to load cities from localStorage
function loadCitiesFromLocalStorage() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
    for (const city of cities) {
        const cityLink = document.createElement('a');
        cityLink.href = '#';
        cityLink.textContent = city;
        cityLink.addEventListener('click', () => {
            fetchCityWeather(city);
        });
        searchHistory.appendChild(cityLink);
    }
}

// Function to clear search history from local storage
function clearSearchHistory() {
    localStorage.removeItem('cities');
    loadCitiesFromLocalStorage(); // Reload the search history section
}

// Attach a click event listener to the "Clear Search History" button
document.getElementById('clear-history-button').addEventListener('click', clearSearchHistory);

// Function to display weather data
function displayWeather(data) {
    // Update your HTML with the weather data

    // Display current weather
    const currentWeather = data.list[0];
    const currentWeatherContainer = document.getElementById('current-weather');
    currentWeatherContainer.innerHTML = '';

    // ... (current weather display code from the previous response)

    // Display 5-day forecast
    const forecastContainer = document.getElementById('forecast-weather');
    forecastContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const forecastData = data.list[i * 8];
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        // Create elements for forecast data (date, icon, temperature, wind speed, humidity)
        // You can use the same structure as in the current weather display

        // Append elements to the forecast item
        // forecastItem.appendChild(dateElement);
        // forecastItem.appendChild(iconElement);
        // forecastItem.appendChild(temperatureElement);
        // forecastItem.appendChild(windSpeedElement);
        // forecastItem.appendChild(humidityElement);

        forecastContainer.appendChild(forecastItem);
    }
}

// Function to fetch weather data for a city
function fetchCityWeather(city) {
    // Make an API request to get weather data
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
            saveCityToLocalStorage(city);
            localStorage.setItem('lastSearchedCity', city); // Update last searched city
            loadCitiesFromLocalStorage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Load cities from localStorage when the page loads
loadCitiesFromLocalStorage();

// Check if there is a previously searched city in local storage and fetch its weather data
const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
    fetchCityWeather(lastSearchedCity);
}

// Add an event listener to the search button
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetchCityWeather(city);
});
