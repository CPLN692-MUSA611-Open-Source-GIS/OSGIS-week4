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

//https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json
//get data of capital cities
var request = $.ajax({url: 'https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json',
success: function(res) {
  data = JSON.parse(res);
}
})
// print data 
request.done((res)=>{console.log(res)})
// add markers
// I had to copy image folder from previous week 
request.done((res)=>{_.each(data, function(capitals){
  L.marker([capitals.CapitalLatitude,capitals.CapitalLongitude]).addTo(map)
    .bindPopup(capitals.CapitalName + ", " + capitals.CountryName);
})})

