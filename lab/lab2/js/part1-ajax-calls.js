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

var request = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json")
request.done(function(data){
    // parse data
    var parsed = JSON.parse(data)
    var parsedType = parsed.map(function(data){
        data["CapitalLatitude"] = parseFloat(data["CapitalLatitude"])
        data["CapitalLongitude"] = parseFloat(data["CapitalLongitude"])
        return data;
    })

    // make data into markers
    parsedType = parsedType.map(function (data) {
         return L.marker([data["CapitalLatitude"], data["CapitalLongitude"]])
    })

    //plot
    parsedType.forEach(function(marker) {
        console.log(marker)
        marker.addTo(map)
    })
})
