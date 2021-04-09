let todaysDate = new Date();

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

let month = months[todaysDate.getMonth()];
let day = todaysDate.getDate();
let hour = todaysDate.getHours();
let minute = todaysDate.getMinutes();

let todaysShownDay = document.querySelector("#theDateIwant");
todaysShownDay.innerHTML = `${month} ${day}`;

let shownTime = document.querySelector("#theTimeNow");
shownTime.innerHTML = `${hour}:${minute}`;

function searchForCity(event) {
  event.preventDefault();
  let citySubmission = document.querySelector("#city-input");
  let cityShowing = document.querySelector("#cityShowing");
  if (citySubmission.value) {
    cityShowing.innerHTML = `${citySubmission.value}`;
  } else {
    cityShowing.innerHTML = "Search a city";
    alert("Enter a city to find out the weather");
  }
  {
    function showTemperature(response) {
      let temperature = Math.round(response.data.main.temp);
      let shownTemp = document.querySelector("#temperatureNow");
      let condition = response.data.weather[0].description;
      let shownCondition = document.querySelector("#conditionNow");
      shownTemp.innerHTML = `${temperature}° C`;
      shownCondition.innerHTML = condition;
    }
    let city = citySubmission.value;
    let units = "metric";
    let apiKey = "0876a26dbec061e6e6fe7ca8272a7530";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
  }
}
let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchForCity);

function showPosition(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your Location`;
  let apiKey = "0876a26dbec061e6e6fe7ca8272a7530";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let shownTemp = document.querySelector("#temperatureNow");
    let condition = response.data.weather[0].description;
    let shownCondition = document.querySelector("#conditionNow");
    shownTemp.innerHTML = `${temperature}° C`;
    shownCondition.innerHTML = condition;
  }
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", getCurrentPosition);
