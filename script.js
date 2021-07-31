// Declaring Variables:-----------------------------------//
var historyEl = document.querySelector('#history');
var goButtonEl = document.querySelector('.goBtn');
var citySearch = document.querySelector('.city');
console.log(citySearch);

// Retrieve saved Locations from Local Storage-----------//
function displaySavedLocations() {

    var locations = localStorage.getItem("savedLocations");

    if (locations) {
        var parsedLocations = JSON.parse(locations);
        parsedLocations.forEach(function(item){
            var listItem = document.createElement("li");
            var content = `<button data-location="${item}">${item}</button>`;
            listItem.innerHTML = content;
            historyEl.appendChild(listItem);
            });
    };
};

function updateContentPane(evt) {
    var buttonClicked = evt.target;
    console.log(citySearch.value);
    var location = buttonClicked.getAttribute("data-location");
    window.alert(location);
}

function setEventListeners () {
    goButtonEl.addEventListener('click', updateContentPane);
}

function init() {
    getForecast("Atlanta");
    setEventListeners();
    displaySavedLocations();
}

init();

// -------------------------------------------------------//

var searchedCities = [];

function getForecast(city) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d04c941f9a17d4fd069f2142973171ec&units=imperial";
    fetch(queryUrl)
    .then(function (response) {
      if (response.ok){ 
          response.json().then(function (data){
              console.log(data);
          });
        }
          else {alert('invalid!')};
    })
};


function get5DayForecast(city) {
    var queryUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d04c941f9a17d4fd069f2142973171ec&units=imperial";
    fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })

    .then (function (data) {

    })
}

goBtn.addEventListener('click', getForecast, get5DayForecast);
