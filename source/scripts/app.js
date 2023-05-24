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

    if (input.value = input.value.replace(/[^A-Za-z]/ig, '')) {
        setTimeout(() => {
            container.style.maxWidth = '684px';
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
    } else {
        const template = `
            <div class="notification__icon-wrapper">
                <img class="notification__icon" src="source/images/error-icon.svg">
            </div>
            <p class="notification__text">You cannot write in languages other than English and also numbers, symbols</p>
            <button class="notification__close">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.703943 8C0.525014 8 0.346086 7.9341 0.204826 7.79288C-0.0682755 7.51986 -0.0682755 7.06796 0.204826 6.79494L6.79694 0.204766C7.07004 -0.0682554 7.52207 -0.0682554 7.79517 0.204766C8.06828 0.477788 8.06828 0.929683 7.79517 1.2027L1.20306 7.79288C1.0618 7.9341 0.882871 8 0.703943 8Z" fill="#5F5F5F"/>
                    <path d="M7.29606 8C7.11713 8 6.9382 7.9341 6.79694 7.79288L0.204826 1.2027C-0.0682755 0.929683 -0.0682755 0.477788 0.204826 0.204766C0.477928 -0.0682554 0.929957 -0.0682554 1.20306 0.204766L7.79517 6.79494C8.06828 7.06796 8.06828 7.51986 7.79517 7.79288C7.65391 7.9341 7.47499 8 7.29606 8Z" fill="#5F5F5F"/>
                </svg>    
            </button>
        `

        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.insertAdjacentHTML('beforeend', template);

        const notifications = document.querySelector('.notifications');
        notifications.insertAdjacentElement('beforeend', notification);
        
        setTimeout(() => {
            notification.classList.add('notification-active');
        }, 200)

        setTimeout(() => {
            notification.classList.remove('notification-active');

            setTimeout(() => {
                notification.remove();
            }, 200)
        }, 6000)

        const close = document.querySelector('.notification__close');
        close.addEventListener('click', () => {
            notification.classList.remove('notification-active');

            setTimeout(() => {
                notification.remove();
            }, 200)
        })
    }
})


const weatherReturn = document.querySelector('.weather__return');

weatherReturn.addEventListener('click', () => {
    container.style.maxWidth = '658px';
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