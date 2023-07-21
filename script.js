console.log('hello');

// api key :  92efafae85345bebbd9c72b2763f235c

const iconElement = document.querySelector('.weather-icons');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');
const maxTemp = document.querySelector('.maxtemp-value');
const minTemp = document.querySelector('.mintemp-value');

//Data
const weather = {

}

weather.temperature = {
    unit: "celsius"
}
/*
weather.maxTemp = {
    unit : "celsius"
}
weather.minTemp = {
    unit : "celsius"
}*/

// const and var
const KELVIN = 273;

//api key
const key = "92efafae85345bebbd9c72b2763f235c";

//check if brouser supports geonavigation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p>Brouser Doesn't support geolocation</p>";
}

//set user position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//show erroe message when there is an issue with the geolocation service
function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

//get the weather data from api 
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            /*
            weather.maxTemp.value = (data.main.temp_max - KELVIN);
            weather.minTemp.value = Math.floor(data.main.temp_min - KELVIN);*/
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather()
        })
}

//displayWeather to my website
function displayWeather() {
    iconElement.innerHTML = `<img src="/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    /*    maxTemp.innerHTML = `<p><span>Max temperature = </span> ${weather.maxTemp.value}°<span>C</span></p>`;
        minTemp.innerHTML = `<p><span>Min temperature = </span> ${weather.minTemp.value}°<span>C</span></p>`;*/
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city} , ${weather.country} `
}

//celsius to farhenite
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}


//when user lick on temperature
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius") {
        let farhenite = celsiusToFahrenheit(weather.temperature.value);
        farhenite = Math.floor(farhenite);

        tempElement.innerHTML = `${farhenite}°<span>F</span>`;
        weather.temperature.unit = "farhenite";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});