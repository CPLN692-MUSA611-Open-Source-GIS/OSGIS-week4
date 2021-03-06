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


// let capitals = $.ajax({
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

// for (var i=0; i < capitals.length; i++) 
//     {
//       L.marker([capitals[i][1],capitals[i][0]]).addTo(map).bindPopup(capitals[i][2]).openPopup();
//     }

promise = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json")
promise.done((arg)=>{console.log(arg)
  let parsedArg = JSON.parse(arg)
  parsedArg.forEach(addMarkers)
  function addMarkers(capitals){
    var marker =L.marker([capitals.CapitalLatitude, capitals.CapitalLongitude]).addTo(map);
  }})