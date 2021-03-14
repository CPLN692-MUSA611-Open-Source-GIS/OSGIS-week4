var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 2
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


request = $.ajax('https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json');
console.log(request)

//data
request.done((res) => {
  let parsed = JSON.parse(res)
  console.log(parsed) 
  
  // add markers to map
  var addMarker = function(capital){
  console.log(capital)
  lat = capital.CapitalLatitude;
  lng = capital.CapitalLongitude;
  Content = capital.CapitalName + ", \n" + capital.CountryName+ ", \n" + capital.ContinentName;
  L.marker([lat, lng]).addTo(map).bindPopup(Content).openPopup()
  }

  parsed.forEach(addMarker)

})