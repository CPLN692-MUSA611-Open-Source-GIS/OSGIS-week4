/* =====================
  Lab 2, part3: a full application

  We're going to use the skills we've just been practicing to write a full application
  which is responsive to user input.
  At your disposal are a set of variables which we use to track user input (see
  part3-main.js and part3-setup.js for more details on how this is done — we'll
  cover this topic at a later date). Their values will be logged to console to
  aid in debugging.

  In this lab, which is very much open-ended, your task is to use the value of
  these variables to define the functions below. Try to come up with interesting
  uses of the provided user input.

  Some ideas:
    There are two numeric fields: can you write this application to filter
    using both minimum and maximum?
    There is a boolean (true/false) field: can you write your code to filter according
    to this boolean? (Try to think about how you could chop up this data to make this meaningful.)
    There is a string field: can you write your code to filter/search based on user
    input?

  Remember, this is open-ended. Try to see what you can produce.
===================== */

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function() {
  /* =====================
    Fill out this function definition
  ===================== */
    myMarkers.forEach(function(marker){
      map.removeLayer(marker)
    })
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() { //get is the promise, it gets the data. We have seen the parse- in json.parse, we also need to clean up numbers
  promise = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json")
  promise.done((data) => {
    // console.log(data)
    // myData = JSON.parse(data) //myData references this thing in part3-setup
    var capitals =JSON.parse(data)
    var cleancapitals = capitals.map(function (capital){
      capital.CapitalLatitude= Number(capital.CapitalLatitude)
      capital.CapitalLongitude= Number(capital.CapitalLongitude)
      return capital
    })
    myData = cleancapitals
  })
    
    
    // var parsedArg = JSON.parse(arg)
    //     parsedArg.forEach(addMarkers)
    //     function addMarkers(marker){
    //        L.marker([CapitalLatitude, CapitalLongitude]).addTo(map)
    //     };)
    //   })

    //   var parseData = function(data) {
    //     // data.forEach(JSON.parse(data);
    //     //console.log(data) //this is a string
    //     //console.log(JSON.parse(data)) //this is a function that takes data/ string and turns into js object
    //     var capitals = JSON.parse(data)
    //     var cleancapitals = capitals.map(function (capital){
    //       capital.CapitalLatitude= Number(capital.CapitalLatitude)
    //       capital.CapitalLongitude= Number(capital.CapitalLongitude)
    //       return capital
    //     })
    //     //console.log(cleancapitals)
    //      return cleancapitals
    //   };
  /* =====================
    Fill out this function definition
  ===================== */
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  var filtered = myData.filter(function(x){
    return x.ContinentName == stringField
    })
   filtered= filtered.filter(function(x){
      return x.CapitalLatitude >= numericField1 && x.CapitalLongitude >= numericField2
      })
      filtered= filtered.filter(function(x){
        return x.ContinentName.startsWith("A") == booleanField
        })
    myMarkers = filtered.map(function(y){ //map pushes each succesive result into a new array
      //console.log(y)
       return L.marker([y.CapitalLatitude, y.CapitalLongitude]).bindPopup(y.CountryName)
    })
    myMarkers.forEach(function(marker){
      marker.addTo(map)
  })

};
