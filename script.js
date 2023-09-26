const container = document.querySelector('.container');
const searchInput = document.querySelector('.search-box input');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const date = document.querySelector('.date');
const summary = document.querySelector('.summary');
const error404 = document.querySelector('.not-found');

const locationSearch = () => {
   
   const KEY = 'a4ed9ec3dbf8ab00d343f33d13e975be';
   const city = document.querySelector('.search-box input').value;
   let url = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric&q=${city}`;

   const IMG_KEY = 'Pwlsxx6aHFDOwzvtggPeV8Gbli13E80t3nh_eixQHw8';
   const cityImg = document.querySelector('.search-box input').value;
   let imgUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityImg)}&client_id=${IMG_KEY}`;
   

   if (city === '')
      return;

   fetch(url)
      .then(response => response.json())
      .then(data => {

         if (data.cod === '404') {
            container.style.height = '500px';
            weatherBox.style.display = 'none';
            date.style.display = 'none';
            summary.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
         }

         error404.style.display = 'none';
         error404.classList.remove('fadeIn');

         const image = document.querySelector('.weather-box img');
         const temperature = document.querySelector('.temperature');
         const description = document.querySelector('.description');
         const highTemp = document.querySelector('.high');
         const lowTemp = document.querySelector('.low');

         const humidity = document.querySelector('.humidity span');
         const wind = document.querySelector('.wind span');
         const sunrise = document.querySelector('.sunrise span');
         const sunSet = document.querySelector('.sunset span');

         switch (data.weather[0].main) {
            case 'Clear':
               image.src = 'images/clear.png';
               break;
            
            case 'Rain':
               image.src = 'images/rain.png';
               break;
            
            case 'Snow':
               image.src = 'images/snow.png';
               break;
            
            case 'Clouds':
               image.src = 'images/cloud.png';
               break;

            case 'Haze':
               image.src = 'images/haze.png';
               break;
            
            default:
               image.src = '';
         }

         const sunriseDate = new Date(data.sys.sunrise * 1000);
         const sunsetDate = new Date(data.sys.sunset * 1000);

         function formatNumber(num) {
            return num < 10 ? `0${num}` : num;
         }
         function getTimeString(dateS) {
            const hours = formatNumber(dateS.getHours());
            const minutes = formatNumber(dateS.getMinutes());
            return `${hours}:${minutes}`;
         }

         const today = new Date();

         const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
         ];

         const day = today.getDate();
         const month = today.getMonth();

         const monthName = monthNames[month].slice(0, 3);


         temperature.innerHTML = `${Math.round(data.main.temp)}°`;
         description.innerHTML = data.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
         highTemp.innerHTML = `H: ${Math.round(data.main.temp_max)}°`;
         lowTemp.innerHTML = `L: ${Math.round(data.main.temp_min)}°`;
         date.innerHTML = `${day}, ${monthName}`;
         humidity.innerHTML = `${data.main.humidity}%`;
         wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;
         sunrise.innerHTML = getTimeString(sunriseDate);
         sunSet.innerHTML = getTimeString(sunsetDate);

         weatherBox.style.display = '';
         summary.style.display = '';
         weatherBox.classList.add('fadeIn');
         summary.classList.add('fadeIn');
         container.style.height = '688px';


         // fetch IMAGE

         fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
               if (data.results.length > 0) {
                  const randomIndex = Math.floor(Math.random() * 6);
                  const imageUrl = data.results[randomIndex].urls.regular;
                  weatherBox.style.background = `url(${imageUrl}) center/cover no-repeat`;
                  weatherBox.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
               } else {
                  weatherBox.style.background = 'transparent';
               }
            })

      });
   searchInput.blur();
};

search.addEventListener('click', locationSearch);
searchInput.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) {
      locationSearch();
   }
});