function formatDate(timestamp){
let  date = new Date (timestamp);
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
  "Saturday"
];

let day = days[date.getDay()];

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
  "December"
];

let month = months[date.getMonth()];
let currentDate = date.getDate();

return `${month} ${currentDate} <br/>  ${day} ${hours}: ${minutes}`;

}


function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days =  [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return days[day];

}



//
function displayForecast (response){
let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay , index) {
    if (index < 6) {
    forecastHTML = forecastHTML +`
        <div class="col-2">
          <span class="forecast-date"> ${formatDay(forecastDay.dt)} </span>
          <br />
          <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="60" />

             <div class="forecast-temperatures">
                <span class="forecast-temp-max"> ${Math.round(forecastDay.temp.max)}°</span> 
                <span class="forecast-temp-min"> ${Math.round(forecastDay.temp.min)}°</span> 
            </div>
        </div>
`;
}
  });

forecastHTML =forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}


//

function searchLocation(position) {
  let apiKey = "c48f152f0e04033d01dba3c6ec2d4606";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = `metric`;
  let apiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// current temperature - my location
function showTemperature(response) {
  console.log(response);

 
  let currentTemp = document.querySelector("h3");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let desciption = document.querySelector("#description");
  desciption.innerHTML = response.data.weather.description;

}

let currentLocationButton = document.querySelector("#current-temp-button");
currentLocationButton.addEventListener("click", showCurrentLocation);

// daily forecast

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "c48f152f0e04033d01dba3c6ec2d4606"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayForecast);
}

  


//


function showTemperature(response){
   console.log(response.data);

let temperature = document.querySelector("h3");
let cityElement = document.querySelector("#city-input");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let high = document.querySelector("#high");
let low = document.querySelector("#low");
let date = document.querySelector("#date");
let icon = document.querySelector("#icon");
let cityName = document.querySelector("h1");

if (response.data.name) {
  cityName.innerHTML = `Today's forecast for ${response.data.name}`;
} else {
  cityName.innerHTML = null;
  alert("Please Type a City");
}

celsiusTemperature = response.data.main.temp;

temperature.innerHTML = `${Math.round(response.data.main.temp)}° `;
cityElement.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].description;
humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
windSpeed.innerHTML =  `Wind:${Math.round(response.data.wind.speed)} Km/Hr`;
high.innerHTML = `High:${Math.round(response.data.main.temp_max)}° `;
low.innerHTML = `Low:${Math.round(response.data.main.temp_min)}° `;
date.innerHTML =formatDate(response.data.dt * 1000);
icon.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 

getForecast(response.data.coord);

} 

 function search(city){
  let apiKey = "c48f152f0e04033d01dba3c6ec2d4606"; 
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(showTemperature);
 
 }


function handleSubmit(event){
  event.preventDefault();
let cityInput = document.querySelector("#city-input").value;
search(cityInput);

}

function showFahrenheitTemperature(event){
  event.preventDefault();
let temperature = document.querySelector("#temp-input");

celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32 ;
temperature.innerHTML =  `${Math.round(fahrenheitTemperature)}°`;
}

function showCelsiusTemperature(event){
  event.preventDefault();
let temperature = document.querySelector("#temp-input");
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");

temperature.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;


let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", handleSubmit);


let fahrenheitLink =  document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink =  document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);


search("Toronto");
