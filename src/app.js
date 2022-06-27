function formatDay(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dateDay = date.getDate();
  let year = date.getFullYear();
  return `${month} ${dateDay}, ${year}`;
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecastHTML = `
              <div class="row">
                <div class="col-2">
                  <div class="forecast-wrap">
                  <div class="date">Friday</div>
                  <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42">
                  <div class="temperature-forecast">
                    <span class="max-temp-forecast">30</span>
                    <span class="min-temp-forecast">18</span>
                  </div>
                  </div>
                </div>           
              </div>
              `;
  forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let dayElement = document.querySelector("#day-time");
  dayElement.innerHTML = formatDay(response.data.dt * 1000);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "6243bd378295e87dcd4f90e3e23db829";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function fahrenheitChange(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  // replace class
  celsiusLink.classList.replace("active", "passive");
  fahrenheitLink.classList.replace("passive", "active");
}

function celsiusChange(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
  // replace class
  celsiusLink.classList.replace("passive", "active");
  fahrenheitLink.classList.replace("active", "passive");
}

let celsiusTemp = null;

search("Zvenyhorod");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitChange);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", celsiusChange);

//example cities
let newYorkcity = document.querySelector("#new-york-city");
newYorkcity.addEventListener("click", newYorkSubmit);

function newYorkSubmit(event) {
  event.preventDefault();
  let city = "new york";
  search(city);
}

let londoncity = document.querySelector("#london-city");
londoncity.addEventListener("click", londonSubmit);

function londonSubmit(event) {
  event.preventDefault();
  let city = "london";
  search(city);
}

let pariscity = document.querySelector("#paris-city");
pariscity.addEventListener("click", parisSubmit);

function parisSubmit(event) {
  event.preventDefault();
  let city = "paris";
  search(city);
}

let tokyocity = document.querySelector("#tokyo-city");
tokyocity.addEventListener("click", tokyoSubmit);

function tokyoSubmit(event) {
  event.preventDefault();
  let city = "tokyo";
  search(city);
}

showForecast();
