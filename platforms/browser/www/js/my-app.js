// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    getWeather();

    var onSuccess = function(position){
        console.log("Latitude: " + position.coords.latitude + " - Longitude: " + position.coords.Longitude);
    }
    function onError(error){
        console.log('code: ' + error.code + ' - message: ' + error.message);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

$$("#change-location").on('click', function(){
    console.log("change location");

    myApp.closeModal('.popover-links', true);

    myApp.prompt('New Location', "", function(value){
        console.log(value);
        getWeather(value);
    });

});

function getWeather(location){
    if (location == "" || location == null){
        location = "q=New_York";
    } else {
        location = "q=" + location;
    }
    var API_URL = "http://api.openweathermap.org/data/2.5/";
    var apiKey = "6e063f0871fe04832edc822481f99627";

    $$.get(API_URL + "weather?" + location + "&appid=" + apiKey + "&units=imperial", function(data){
        console.log(data);
        var weatherData = JSON.parse(data);

        // Location 
        $$("#title").text(weatherData.name);
        
        // Temperature
        $$("#temp").text(weatherData.main.temp);
        
        // Weather
        $$("#weather").text(weatherData.weather[0].main);

        // Humidity
        $$("#humidity").text(weatherData.main.humidity);

        // Low
        $$("#low").text(weatherData.main.temp_min);

        // High
        $$("#high").text(weatherData.main.temp_max);

        // Icon
        var icon = "";
        switch(weatherData.weather[0].icon){
            case "01d":
                icon = "wi-day-sunny";
                break;
            case "02d":
                icon = "wi-day-cloudy";
                break;
            case "03d":
                icon = "wi-cloudy";
                break;
            case "04d":
                icon = "wi-cloud";
                break;
            case "09d":
                icon = "wi-showers";
                break;
            case "10d":
                icon = "wi-rain";
                break;
            case "11d":
                icon = "wi-storm-showers";
                break;
            case "13d":
                icon = "wi-snow";
                break;
            case "50d":
                icon = "wi-dust";
                break;

            case "01n":
                icon = "wi-night-clear";
                break;
            case "02n":
                icon = "wi-night-alt-cloudy";
                break;
            case "03n":
                icon = "wi-cloudy";
                break;
            case "04n":
                icon = "wi-cloud";
                break;
            case "09n":
                icon = "wi-showers";
                break;
            case "10n":
                icon = "wi-rain";
                break;
            case "11n":
                icon = "wi-storm-showers";
                break;
            case "13n":
                icon = "wi-snow";
                break;
            case "50n":
                icon = "wi-dust";
                break;

            default:
                icon = "wi-day-sunny";
                break;
        }
        $$(".weather-icon").find(".wi").remove();
        $$(".weather-icon").append('<i class="wi ' + icon + '"></i>');
    });

    $$.get(API_URL + "forecast/daily?" + location + "&appid=" + apiKey + "&units=imperial&cnt=3", function(data){
        console.log(data);
        var weatherData = JSON.parse(data);

        for(var i = 0; i < weatherData.list.length; i++){
            if (i != 0){
                var temp = 0;
                var date = new Date();
                var icon = "";

                temp = weatherData.list[i].temp.day;
                date = new Date(weatherData.list[i].dt * 1000);
                var month = "";
                switch(date.getMonth()){
                    case 0:
                        month = "January";
                        break;
                    case 1:
                        month = "February";
                        break;
                    case 2:
                        month = "March";
                        break;
                    case 3:
                        month = "April";
                        break;
                    case 4:
                        month = "May";
                        break;
                    case 5:
                        month = "June";
                        break;
                    case 6:
                        month = "July";
                        break;
                    case 7:
                        month = "August";
                        break;
                    case 8:
                        month = "September";
                        break;
                    case 9:
                        month = "October";
                        break;
                    case 10:
                        month = "November";
                        break;
                    case 11:
                        month = "December";
                        break;
                    default:
                        month = "January";
                        break;
                }
                formattedDate = month + " " + date.getDate();

                switch(weatherData.list[i].weather[0].icon){
                    case "01d":
                        icon = "wi-day-sunny";
                        break;
                    case "02d":
                        icon = "wi-day-cloudy";
                        break;
                    case "03d":
                        icon = "wi-cloudy";
                        break;
                    case "04d":
                        icon = "wi-cloud";
                        break;
                    case "09d":
                        icon = "wi-showers";
                        break;
                    case "10d":
                        icon = "wi-rain";
                        break;
                    case "11d":
                        icon = "wi-storm-showers";
                        break;
                    case "13d":
                        icon = "wi-snow";
                        break;
                    case "50d":
                        icon = "wi-dust";
                        break;

                    default:
                        icon = "wi-day-sunny";
                        break;
                }

               addCard(temp, formattedDate, icon);
            }
        }
    });

    $$(".forecast-wrapper").children().remove();
    function addCard(temp, date, icon){
        console.log(temp);
        console.log(date);
        console.log(icon);

        var element = '<div class="col-50 forecast card">\
                            <div class="icon color-teal">\
                                <i class="wi + '+icon+'"></i>\
                            </div>\
                            <h3><span class="temp">'+temp+'</span></h3>\
                            <p><span class="date">' + date + '</span></p>\
                        </div>';

        $$(".forecast-wrapper").append(element);
    }
}