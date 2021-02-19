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
  myMarkers.forEach(function(marker) {
      map.removeLayer(marker)
  })

};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  // var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json");
  myData.done(function(data) {
      var parsed = JSON.parse(data)
      var parsedType = parsed.map(function(data){
          data["CapitalLatitude"] = parseFloat(data["CapitalLatitude"])
          data["CapitalLongitude"] = parseFloat(data["CapitalLongitude"])
          return data;
      })
      myData = parsedType;
  })
  // console.log(parsedType)
  // myData = parsedType;

};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  var pointArray = myData

  // filter out latitude below the value
  if (numericField1 !== ""){
      console.log('in numericField1')
      var lat1 = parseFloat(numericField1)
      pointArray = _.filter(pointArray, function(point){
        return point['CapitalLatitude']>lat1;
      });
  }
  // filter out latitude over the value
  if (numericField2 !== ""){
      console.log('in numericField2')
      var lat2 = parseFloat(numericField2)
      pointArray = _.filter(pointArray, function(point){
        return point['CapitalLatitude']<lat2;
      });

  }
  // if boolean field is true, filter out all points with CountryCode === NULL
  if (booleanField === true){
      console.log('in boolean')
      pointArray = _.filter(pointArray, function(point){
        return (point['CountryCode'] !== "NULL");
      });

  }
  // filter out CountryCode
  if (stringField !== ""){
      console.log('in string')
      pointArray = _.filter(pointArray, function(point){
        return (point['ContinentName'] === stringField);
      });
  }

  // turn points into myMarkers
  myMarkers = pointArray.map(function(point) {
      return L.marker([point["CapitalLatitude"], point["CapitalLongitude"]]);
  })

  myMarkers.forEach(function(marker) {
      marker.addTo(map)
  })

};
