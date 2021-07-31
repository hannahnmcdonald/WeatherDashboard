// // Declaring Variables: -----------------------------------------------------------------//
// var goBtn =  document.querySelector('.goBtn');
// var city = document.querySelector('.city');
// var searchedCities = [];

// function getForecast() {
//     var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=d04c941f9a17d4fd069f2142973171ec";
//     fetch(queryUrl)
//     .then(function (response) {
//       return response.json();
//     })

//     .then (function (data) {


//     })


// };

// function get5DayForecast() {
//     var queryUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&appid=d04c941f9a17d4fd069f2142973171ec";
//     fetch(queryUrl)
//     .then(function (response) {
//       return response.json();
//     })

//     .then (function (data) {

//     })
// }

// goBtn.addEventListener('click', getForecast, get5DayForecast);


// Declaring Variables:-----------------------------------//
var historyEl = document.querySelector('#history');




function displaySavedLocations() {
    var locations = ['Chicago','London', 'Munich'];
    // <li><button data-location="Chicago">Chicago</button></li>
    locations.forEach(function(item){
    var listItem = document.createElement('li');
    var content = `<button data-location="${item}">${item}</button>`
    listItem.innerHTML = content;
    historyEl.appendChild(listItem);
    });
    
}


function init() {
    displaySavedLocations();
}

init();