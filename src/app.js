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

function showTemp(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let feelElement = document.querySelector("#feels-like");
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
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
}

function celsiusChange(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

search("Zvenyhorod");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitChange);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", celsiusChange);
