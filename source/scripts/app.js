const container = document.querySelector('.container');
const form = document.querySelector('.form');
const weather = document.querySelector('.weather');
const input = document.querySelector('.form__input');
const info = document.querySelector('.weather__info');
const error = document.querySelector('.weather__error');
const loading = document.querySelector('.weather__loading');

let city;


const formWeather = document.querySelector('.form__weather');

formWeather.addEventListener('submit', (event) => {
    event.preventDefault();

    setTimeout(() => {
        container.style.maxWidth = '670px';
        form.classList.add('form-hidden');
        weather.classList.add('weather-active');
    }, 150)

    city = input.value.trim();


    const APIKey = 'a0df420dd38b40f4ad4180413233004';
    const query = `https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${city}&days=1&aqi=no&alerts=no`;

    async function getResponse() {
        const response = await fetch(query);
        const json = await response.json();
        console.log(json)

        if (json.error) {
            if (json.error.code === 1006) {
                loading.classList.add('weather-hidden');
                error.classList.remove('weather-hidden');
            }
        } else {
            const weatherCity = document.querySelector('.weather__city');
            weatherCity.innerText = json.location.name;
    
            const weatherCounty = document.querySelector('.weather__county');
            weatherCounty.innerText = json.location.country;
    
            const weatherDegree = document.querySelector('.weather__degree-num');
            weatherDegree.innerText = json.forecast.forecastday[0].day.avgtemp_c;
    
            const weatherWind = document.querySelector('.wind__value');
            weatherWind.innerText = json.forecast.forecastday[0].day.maxwind_mph;
    
            const weatherHumidity = document.querySelector('.humidity__value');
            weatherHumidity.innerText = json.forecast.forecastday[0].day.avghumidity;

            const weatherImage = document.querySelector('.weather__image');
            let x;
            switch (json.current.condition.code) {
                case 1000: 
                    weatherImage.src = 'source/images/weather/sunny.svg';
                    break;
                case 1063 || 1072 || 1150 || 1153 || 1168 || 1171 || 1180 || 1183 || 1186 || 1189 || 1192 || 1195 || 1198 || 1201 || 1237 || 1240 || 1243 || 1246 || 1261 || 1264: 
                    weatherImage.src = 'source/images/weather/rain.svg';
                    break;
                case 1003 || 1006 || 1009: 
                    weatherImage.src = 'source/images/weather/cloud.svg';
                    break;
                case 1087 || 1273 || 1276 || 1279 || 1282: 
                    weatherImage.src = 'source/images/weather/storm.svg';
                    break;
                case 1066 || 1069 || 1114 || 1117 || 1204 || 1207 || 1210 || 1213 || 1216 || 1219 || 1222 || 1225 || 1249 || 1252 || 1255 || 1258 || 1117: 
                    weatherImage.src = 'source/images/weather/snow.svg';
                    break;
            }

            loading.classList.add('weather-hidden');
            info.classList.remove('weather-hidden');
        }
    }

    getResponse();
})


const weatherReturn = document.querySelector('.weather__return');

weatherReturn.addEventListener('click', () => {
    container.style.maxWidth = '640px';
    weather.classList.remove('weather-active');
    form.classList.remove('form-hidden');

    setTimeout(() => {
        if (loading.className === 'weather__loading weather-hidden') {
            loading.classList.remove('weather-hidden');
            error.classList.add('weather-hidden');
            info.classList.add('weather-hidden');
        }
    }, 160)

    input.value = '';
    input.focus();
})