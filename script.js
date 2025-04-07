
const apiKey = 'e48fca008c5a3c6be3503bb7ef47f102'; 
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const cityElement = document.querySelector('.city');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const weatherIconElement = document.querySelector('.weather-icon');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function displayWeather(data) {
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    windElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
}

searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
}); 