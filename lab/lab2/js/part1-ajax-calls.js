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


//var countrycapitals = $.ajax("https: //github.com/CPLN692-MUSA611-Open-Source-GIS/datasets/blob/master/json/world-country-capitals.json"[countries]);

// var countrycapitals =$.ajax({
//   url: "https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json",
//    type:"get",
//    dataType:'json',  
//    success: function(data){
//      console.log(data);
//    },
//    error:function() {
//      console.log("err");
//    }
// });

// promise = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json")
// promise.done((arg) => console.log(arg))
//       var parsedArg = JSON.parse(arg)
//         parsedArg.forEach(addMarkers)
//         function addMarkers(installation){
//           var marker = L.marker([CapitalLatitude, CapitalLongitude]).addTo(map)
//         };)
//       })

promise = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-solar-installations.json/master/json/world-country-capitals.json")
promise.done((arg) => console.log(arg)
    var parsedArg = JSON.parse(arg){
    parsedArg.forEach(addMarkers)
    function addMarkers(installation){
      var marker=L.marker([installation.LAT, installation.LONG_].addTo(map))
};
}
)

// promise = $.ajax ("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-solar-installations.json")
// promise.done( (arg) => { console.log(arg)
//   var parsedArg = JSON.parse(arg)
//   parsedArg.forEach(addMarkers)
//   function addMarkers(installation){
//     var marker = L.marker([installation.LAT, installation.LONG_]).addTo(map)
//   };
// })



// for (var i=0; i < countrycapitals.length; i++) 
//     {
//       L.marker([countrycapitals[i]["CapitalLatitude"],countrycapitals[i]["CapitalLongitude"]]).addTo(map).bindPopup(countrycapitals[i][2]).openPopup();
//     }
//L.marker([50.5, 30.5]).addTo(map);