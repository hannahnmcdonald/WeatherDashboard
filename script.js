var APIKey = "d04c941f9a17d4fd069f2142973171ec";

var city;

function getForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL);

};

getForecast();
