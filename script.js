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
  
  function searchLocation(position) {
    let apiKey = "c48f152f0e04033d01dba3c6ec2d4606";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units = `metric`;
    let apiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  // current temperature - my location
  function showTemperature(response) {
    console.log(response);
  
    let h1 = document.querySelector("h1");
    let city = response.data.name;
    if (response.data.name) {
      h1.innerHTML = `Today's forecast for ${city}`;
    } else {
      h1.innerHTML = null;
      alert("Please Type a City");
    }
  
    let currentTemp = document.querySelector("h3");
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  }
  let currentLocationButton = document.querySelector("#current-temp-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  // search  a city
  
  function goSearchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchCity(city) {
    let apiKey = "c48f152f0e04033d01dba3c6ec2d4606";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let units = `metric`;
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showTemperature);
  }
  
  console.log(searchCity);
  
  let form = document.querySelector("#search-button");
  form.addEventListener("submit", goSearchCity);
  
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", goSearchCity);
  