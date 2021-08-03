// Declaring Variables:-----------------------------------//
var historyEl = document.querySelector('#history');
var goButtonEl = document.querySelector('.goBtn');
var citySearch = document.querySelector('.city');
var cardDeck = document.querySelector('.card-deck');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var humidity = document.querySelector('#humidity');
var UVIndex = document.querySelector('#UVIndex');
var cardDate = document.querySelector('#date');
var photo = document.getElementById('img');
var cityTitle = document.querySelector('.cityTitle');
// Declaring Constants:----------------------------------//
const apiUrl = "https://api.openweathermap.org";
const apiKey = "d04c941f9a17d4fd069f2142973171ec";


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
    // var content = `<button data-location="${location}">${location}</button>`;
    // listItem.innerHTML = content;

    var button = document.createElement("button");
    button.setAttribute("data-location", location);
    button.textContent = location;

    button.addEventListener('click', function() {
        citySearch.value = location;
        getLocation();
    })

    listItem.append(button)

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

};

// Retrieving API data for inputted location-----------------------------------------//
function getLocation() {
    // Boxes are formed when function is run- changes css from display none to display flex
    cardDeck.style.display = "flex";
    var location = citySearch.value;
    if (!location) {
        window.alert('Please enter a location!');
    }
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

        console.log(location);
    
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
        // Enters API Data into card 
        temp.textContent = data.main.temp + "° F";
        wind.textContent = data.wind.speed + " MPH";
        humidity.textContent = data.main.humidity + "%";
        // Populates city name onto current forecast card
        cityTitle.textContent = data.name;
        cardDate.textContent = moment().format("dddd MM/DD/YYYY");
        // Weather Icon:
        var icon = data.weather[0].icon;
        var photoSrc = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        photo.setAttribute('src', photoSrc);

        // TEST:
        // console.log(data.main.temp)
        // console.log(data.coord.lon)
        // console.log(data.coord.lat)
        // console.log(data.wind.speed)
        // console.log(data.main.humidity)

        handleSuccessfulLocationFetch(data, location);

        var lat = data.coord.lat;
        var lon = data.coord.lon;
        // console.log(lat);
        // console.log(lon);
        getFiveDayForecast(lat, lon);
    })
    .catch(function() {
        window.alert("Something went wrong");
    });


};
// Five day forecast API---------------------------------------------------//
function getFiveDayForecast(lat, lon) {
    var fiveUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch(fiveUrl)
    .then(function (response) {
      if (response.ok){ 
          response.json()
          .then(function (data){
              console.log("data", data);

              var UVIndex = document.querySelector('#UVIndex');
              UVIndex.textContent= data.daily[0].uvi;
              setUltraviolentIndex(UVIndex);

              for (i = 1; i < data.daily.length -2 ; i++) {


                var temp = document.querySelector('#temp' + i);
                var wind = document.querySelector('#wind' + i);
                var humidity = document.querySelector('#humidity' + i);
                var UVIndex = document.querySelector('#UVIndex' + i);
                var cards = document.querySelector('#date' + i);
                // Set Date
                // var time = moment().add();
                var date = moment.unix(data.daily[i].dt).format("dddd MM/DD/YYYY");

                // Set weather photo
                var photo = document.querySelector('#img' + i);
                var icon = data.daily[i].weather[0].icon;
                var photoSrc = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                photo.setAttribute('src', photoSrc);
                
                // TEST: console.log(time);
                // TEST: console.log(date);

                temp.textContent = data.daily[i].temp.day
                wind.textContent = data.daily[i].wind_speed;
                humidity.textContent = data.daily[i].humidity;
                UVIndex.textContent= data.daily[i].uvi;
                
                
                cards.textContent = date;
                setUltraviolentIndex(UVIndex);
                
            }
            
          });
        
        }
    })
};
// Set's the UV Index color-------------------------------------------------//
function setUltraviolentIndex(UVIndex) {
    if (UVIndex.textContent <= 2) {
        UVIndex.style.backgroundColor = "rgba(12, 168, 116, 0.75)"
    } else if (UVIndex.textContent > 2 && UVIndex.textContent <= 7) {
        UVIndex.style.backgroundColor = "rgba(255, 123, 0, 0.75)"
    }else if (UVIndex.textContent > 7) {
        UVIndex.style.backgroundColor = "rgba(255, 0, 0, 0.75)"
    };
};

//------------------------------------------------------------------//

function updateContentPane(event) {
    var buttonClicked = event.target;
    // TEST: console.log(citySearch.value);
    var location = buttonClicked.getAttribute("data-location");
    console.log(location);
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


