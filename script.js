
//making object of weatherapi
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})


//get waether report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .  
        .then(weather => {   //weather is from api
            return weather.json(); // return data from api in JSON
        }).then(showWeaterReport);  // calling showweatherreport function

}

//show weather report

function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==='404'){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{

    // console.log(weather.cod);
    // console.log(weather);  
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent=document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
    }
}



//making a function for the  last update current time 

function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

//date manage for return  current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    // console.log(year+" "+date+" "+day+" "+month);
    return `${date} ${month} (${day}) , ${year}`
}

// function for the dynamic background change  according to weather status
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage ='URL("https://jooinn.com/images/sky-with-clouds-17.jpg")';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url("http://yesofcorsa.com/wp-content/uploads/2017/11/Rainy-Weather-Wallpaper-High-Definition-1024x640.jpg")';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url("https://thumbs.dreamstime.com/b/clear-weather-sky-sun-blue-sky-clouds-sun-rays-solar-clean-energy-power-63376375.jpg")';
    }
    else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url("https://c1.peakpx.com/wallpaper/70/289/270/snow-mountain-winter-landscape-wallpaper.jpg")';
    }
    else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url("http://getwallpapers.com/wallpaper/full/8/4/d/924696-large-sunny-day-background-1920x1080-for-4k-monitor.jpg")';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url("https://cff2.earth.com/uploads/2019/04/10184850/How-do-thunderstorms-affect-the-Earth%E2%80%99s-climate.jpg")';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url("https://www.shemazing.net/wp-content/uploads/2017/10/drizzle2_w630.jpg")';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url("https://www.lightstalking.com/wp-content/uploads/mist-1-5.jpg")';
    }

    else {
        document.body.style.backgroundImage = 'url("https://static.manitobacooperator.ca/wp-content/uploads/2020/02/04110501/sun-temperature-GettyImages-905564552.jpg")';
    }
}

//making a function for the classname of icon
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}