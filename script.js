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


return `${day} ${hours}: ${minutes}`;

}

  
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



temperature.innerHTML = `${Math.round(response.data.main.temp)}° `;
cityElement.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].description;
humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
windSpeed.innerHTML =  `Wind:${Math.round(response.data.wind.speed)} Km/Hr`;
high.innerHTML = `High:${Math.round(response.data.main.temp_max)}° `;
low.innerHTML = `Low:${Math.round(response.data.main.temp_min)}° `;
date.innerHTML =formatDate(response.data.dt * 1000);
icon.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

search("Toronto");

let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", handleSubmit);