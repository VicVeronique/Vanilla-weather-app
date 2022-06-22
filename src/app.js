function showTemp(response) {
  console.log(response.data.main.temp);
}

let apiKey = "6243bd378295e87dcd4f90e3e23db829";
let city = "Zvenyhorod";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
