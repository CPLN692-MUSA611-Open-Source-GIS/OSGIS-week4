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
  myMarkers.map(a => map.removeLayer(a));
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() {
  var downloadData = $.ajax("http://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-crime-snippet.json");
  downloadData.done(function(data) {
    myData = JSON.parse(data);
    return myData
  })

};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  // filter
  currentData = myData
  currentData = _.filter(currentData, function(num) { 
   return num["General Crime Category"] == stringField;
  });
  currentData = _.filter(currentData, function(num) {
    return num["District"] >= numericField1 && num["District"] <= numericField2;
  })
  currentData = _.filter(currentData, function(num) {
    return booleanField == num["Dispatch Date/Time"].includes("PM");
  })
  // plot markers
  myMarkers = [];
  currentData.map( a => myMarkers.push(L.marker([a["Lat"], a["Lng"]]).bindPopup(a["General Crime Category"] + '</br>' + a["Dispatch Date/Time"])));
  myMarkers.map(a => a.addTo(map)) 
};
