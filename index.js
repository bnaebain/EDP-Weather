
//API Key for https://dataservice.accuweather.com
const apiKey = "8YaIwWixO58RpnWEI5GEPEId8YWNneFy"

//Get input from search box with press of "Enter"
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

//Connects to API to pull location data
function getResults(query){
  
//This is to mitigate the CORS/ No 'Access-Control-Allow-Origin' error
var myHeaders = new Headers();
  var url = `https://dataservice.accuweather.com/locations/v1/search?apikey=8YaIwWixO58RpnWEI5GEPEId8YWNneFy&q=${query}`;
  var myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 type: 'json',
                 cache: 'default' };

  var myRequest = new Request(url, myInit);
  

  fetch(myRequest)
    .then(response => {console.log(response)
                       return response.json()})
    .then(location => {console.log(location)
                        return getWeather(location[0])});
}

function getWeather(params){
  
var myHeaders2 = new Headers();

try {
var url2 = `https://dataservice.accuweather.com/currentconditions/v1/${params.Key}/?apikey=8YaIwWixO58RpnWEI5GEPEId8YWNneFy`;
var myInit2 = { method: 'GET',
                 headers: myHeaders2,
                 mode: 'cors',
                 type: 'json',
                 cache: 'default' };
} catch (error){
  let city = document.querySelector('.location .city');
  city.innerText = `Invalid location. Please try again.`;
  let date = document.querySelector('.date');
  date.innerText = null;
  let conditions = document.querySelector('.conditions');
  conditions.innerText = null;
  let temp = document.querySelector('.temp');
  temp.innerText = null;
}
var myRequest2 = new Request(url2, myInit2);


  fetch(myRequest2)
    .then(response2 => {console.log(response2)
                       return response2.json()})
    .then(weather => {console.log(weather)
                        return updateUI(weather[0], params)});
}


function updateUI(weather2, params2){
  let city = document.querySelector('.location .city');
  city.innerText = `${params2.LocalizedName}, ${params2.AdministrativeArea.LocalizedName}, ${params2.AdministrativeArea.CountryID}`;
  
  let date = document.querySelector('.date');
  const time = new Date().toLocaleString("en-US", {timeZone:`${params2.TimeZone.Name}`})
  date.innerText = time
 
  let temp = document.querySelector('.temp');
  temp.innerText = `${weather2.Temperature.Imperial.Value} \xB0${weather2.Temperature.Imperial.Unit}`;
  
  let conditions = document.querySelector('.conditions');
  conditions.innerText = `${weather2.WeatherText}`;
  
}


