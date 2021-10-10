const apiKey = "8YaIwWixO58RpnWEI5GEPEId8YWNneFy"

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

var myHeaders = new Headers();
  var url = 'https://dataservice.accuweather.com/locations/v1/search?apikey=8YaIwWixO58RpnWEI5GEPEId8YWNneFy&q=${query}';
  var myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'no-cors',
                 type: 'json',
                 cache: 'default' };

  var myRequest = new Request(url, myInit);

function getResults(query){
  fetch(myRequest, myInit)
    .then(response => {
      return response.json();
    }).then(updateCity);
}

function updateCity(location) {
  const city = location;
  console.log(city);
}
