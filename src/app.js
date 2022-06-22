function showTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
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
}

let apiKey = "6243bd378295e87dcd4f90e3e23db829";
let city = "Zvenyhorod";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
