let weatherApiEndpoint = 'https://fcc-weather-api.glitch.me/api/current?';
let weatherOverview =[], weatherDetails = [];

//DOM
let weatherHtmlField = document.querySelectorAll('.weather');
let btn_viewFullReport = document.querySelector('#view-full-report');
let viewFullReport = document.querySelector('#full-report');
let weatherOverviewHTML = document.querySelectorAll('.weather-overview');
let btn_exit = document.querySelector('#exit');

navigator.geolocation.getCurrentPosition(data => {

    // setting endPoint with Parameter
    weatherApiEndpoint = weatherApiEndpoint + 'lat=' + data.coords.latitude + '&lon=' + data.coords.longitude; 

    // Fetching Data
    fetch(weatherApiEndpoint)
    .then( e=> e.json())
    .then(e => {

        // Setting array of weatherDetails 
        weatherDetails.push(new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear());
        weatherDetails.push(e.weather[0].main);
        weatherDetails.push(e.weather[0].icon);
        weatherDetails.push(e.main.temp_min);
        weatherDetails.push(e.main.temp_max);
        weatherDetails.push(e.main.pressure);
        weatherDetails.push(e.wind.speed);
        weatherDetails.push(e.main.humidity);
        for (let i=0; i<weatherHtmlField.length; i++) {
            if (i == 2 ) weatherHtmlField[i].src = weatherDetails[i];
            weatherHtmlField[i].innerHTML = weatherDetails[i];
        }

        // Setting array of weather Overview
        weatherOverview.push(e.main.temp);
        weatherOverview.push(e.weather[0].icon);
        weatherOverview.push(e.name + ', ' + e.sys.country);
        for (let i=0; i<weatherOverviewHTML.length; i++) {
            if (i == 1 ) weatherOverviewHTML[i].src = weatherOverview[i];
            else weatherOverviewHTML[i].innerHTML = weatherOverview[i];
        }
        //enable button to show full report 
        btn_viewFullReport.disabled = false;
        btn_viewFullReport.style.color = '#f5deb3';
        btn_viewFullReport.style.borderColor = '#f5deb3';
    });
});

btn_viewFullReport.addEventListener('click', () => {
    viewFullReport.style.display = 'block';
});

btn_exit.addEventListener('click', () => {
    viewFullReport.style.display = 'none';
});