let apiEndPoint = 'https://fcc-weather-api.glitch.me/api/current?';
let weatherDetails = [];

let weatherHtmlField = document.querySelectorAll('.weather');


navigator.geolocation.getCurrentPosition(e => {
    
    // setting endPoint with Parameter
    apiEndPoint = apiEndPoint + 'lat=' + e.coords.latitude + '&lon=' + e.coords.longitude; 
    document.write(e.coords.latitude, e.coords.longitude);
    // Fetching Data
    fetch(apiEndPoint)
    .then( e=> e.json())
    .then(e => {
        weatherDetails.push(new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());
        weatherDetails.push(e.weather[0].main);
        weatherDetails.push(e.main.temp_min);
        weatherDetails.push(e.main.temp_max);
        weatherDetails.push(e.main.pressure);
        weatherDetails.push(e.wind.speed);
        weatherDetails.push(e.sys.sunrise);
        weatherDetails.push(e.sys.sunset);
        for (let i=0; i<weatherHtmlField.length; i++) {
            weatherHtmlField[i].innerHTML = weatherDetails[i];
        }
    });

});