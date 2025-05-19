const apiKey = "1e3e8f230b6064d27976e41163a82b77";
let city1Data = null;
let city2Data = null;

// Load favorites
updateFavoritesUI();

function getWeather(cityInputId) {
  const cityName = document.getElementById(`${cityInputId}-input`).value.trim();
  if (!cityName) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      displayWeather(cityInputId, data);
      if (cityInputId === 'city1') {
        city1Data = data;
        localStorage.setItem('city1', JSON.stringify(data));
      } else {
        city2Data = data;
        localStorage.setItem('city2', JSON.stringify(data));
      }
    })
    .catch(err => alert("City not found"));
}

function displayWeather(cityId, data) {
  const container = document.getElementById("weather-container");
  const section = document.createElement("div");
  section.classList.add("weather-card");
  section.innerHTML = `
    <h2>${data.name} (${cityId})</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
  container.appendChild(section);
}

function addFavorite(cityInputId) {
  const cityName = document.getElementById(`${cityInputId}-input`).value.trim();
  if (!cityName) return;
  
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(cityName)) {
    favorites.push(cityName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesUI();
  }
}

function updateFavoritesUI() {
  const favoritesList = document.getElementById("favorites-list");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = "";
  favorites.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    favoritesList.appendChild(li);
  });
}
