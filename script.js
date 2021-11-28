function formatDate() {
    let hour = now.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
  
    let minute = now.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
  
    let weeks = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
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
  
    let month = months[now.getMonth()];
    let week = weeks[now.getDay()];
    let date = now.getDate();
  
    return `${week} ${hour}:${minute} ${month} ${date}`;
  }
  
  let currentTime = document.querySelector("#first-day");
  let now = new Date();
  
  currentTime.innerHTML = formatDate(now);
  
 function showTemperature(response){
   console.log(response.data);

let temperature = document.querySelector("h3");
let city = document.querySelector("#city-input");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let high = document.querySelector("#high");
let low = document.querySelector("#low");


temperature.innerHTML = `${Math.round(response.data.main.temp)}° `;
city.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].description;
humidity.innerHTML = `Humiidty:${response.data.main.humidity}%`;
windSpeed.innerHTML =  `Wind:${Math.round(response.data.wind.speed)} Km/Hr`;
high.innerHTML = `High:${Math.round(response.data.main.temp_max)}° `;
low.innerHTML = `Low:${Math.round(response.data.main.temp_min)}° `;

 } 

 let apiKey = "c48f152f0e04033d01dba3c6ec2d4606";
 let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
 let units = `metric`;
 let apiUrl = `${apiEndpoint}?q=Toronto&appid=${apiKey}&units=${units}`;

 axios.get(apiUrl).then(showTemperature);
