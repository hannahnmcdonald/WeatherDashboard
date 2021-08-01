// Declaring Variables:-----------------------------------//
var historyEl = document.querySelector('#history');
var goButtonEl = document.querySelector('.goBtn');
var citySearch = document.querySelector('.city');
// Declaring Constants:----------------------------------//
const apiUrl = "https://api.openweathermap.org";
const apiKey = "d04c941f9a17d4fd069f2142973171ec";

// console.log(citySearch);


// Display the recent searches in a list order----------------//
function displaySavedLocations() {

    var locations = localStorage.getItem("savedLocations");

    if (locations) {
        var parsedLocations = JSON.parse(locations);
        parsedLocations.forEach(function (item){
            createHistoryButton(item);
            });
    };
};

// Creates List element for recent searches--------------------//
function createHistoryButton(location) {
    var listItem = document.createElement("li");
    var content = `<button data-location="${location}">${location}</button>`;
    listItem.innerHTML = content;
    historyEl.appendChild(listItem);
};

// Function to save to Local Storage-----------------------------//
function setLocalStorage(location) {
    var locations = localStorage.getItem("savedLocations");
    var parsedLocations = [];
    if (locations) {
        var parsedLocations = JSON.parse(locations);
    } 
    // ALL Lowercase
    var hasLocation = parsedLocations.some(function(loc){
        return loc.toLowerCase() === location.toLowerCase()
    });
    // Save to local Storage
    if (!hasLocation) {
        parsedLocations.push(location);
        localStorage.setItem("savedLocations", JSON.stringify(parsedLocations));
    }
};

function handleSuccessfulLocationFetch(data, location) {
    // Add button to history ul
    createHistoryButton(location);
    // Add to local storage
    setLocalStorage(location);
    // Update the card-today container
    // fetch 5 day forecast
};

// Retrieving API data for inputted location-----------------------------------------//
function getLocation(event) {
    event.preventDefault();
    var location = citySearch.value;
    if (!location) {
        window.alert('Please enter a location!');
    }
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

    // TEST: console.log(location);
    // TEST: console.log(url);
    
    fetch(url).then(function (response) {
        if (!response.ok) {
            console.log(response.status);
        }

        return response.json();

    })
    .then(function (data) {
        console.log("data", data);
        if (data.count === 0) {
            window.alert("this is not a valid location!");
        
        }

        handleSuccessfulLocationFetch(data, location);

    })
    .catch(function() {
        window.alert("Something went wrong");
    });

    
};



//------------------------------------------------------------------//

function updateContentPane(event) {
    var buttonClicked = event.target;
    // console.log(citySearch.value);
    var location = buttonClicked.getAttribute("data-location");
    // window.alert(location);
    console.log(location);
    // getForecast(location)
};

function setEventListeners() {
    goButtonEl.addEventListener('click', getLocation);
    goButtonEl.addEventListener('click', updateContentPane);
};

// Function to call functions------------------------------//
function init() {
    setEventListeners();
    displaySavedLocations();
};

// Call for function that calls other functions above--------------------//
init();

// -------------------------------------------------------//

// var searchedCities = [];




// function get5DayForecast(city) {
//     var queryUrl = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d04c941f9a17d4fd069f2142973171ec&units=imperial";
//     fetch(queryUrl)
//     .then(function (response) {
//       if (response.ok){ 
//           response.json().then(function (data){
//               console.log(data);
//           });
//         }
//           else {alert('invalid!')};
//     })
// };

// goButtonEl.addEventListener('click', getForecast, get5DayForecast);
