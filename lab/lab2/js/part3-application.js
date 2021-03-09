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
  myMarkers.forEach((item) =>{
    map.removeLayer(item);
  }) 
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var filteryear = function(arr, min, max) 
{return arr.YEARBUILT >= min && arr.YEARBUILT <= max; };

var filtername = function(arr, str)
{return arr.NAME.toLowerCase().includes(str.toLowerCase());}

var filterKW = function(arr, bool)
{return arr.KW>5 === bool;}

var getAndParseData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-solar-installations.json");
  downloadData.done((data)=> {
    myData = JSON.parse(data);
  })
};


/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var makeMarkers = function(data) {
  let markerlst = []
  data.forEach((item) =>{
    markerlst.push(L.marker([item.Y, item.X]));
  });
  return markerlst;
};

var plotMarkers = function(lst) {
  lst.forEach((item) =>{
  item.addTo(map);
  })
};

var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  console.log(myData);
  let filter_data = _.filter(myData, (item) => {
    return filteryear(item, numericField1, numericField2) &&
    filtername(item, stringField) &&
    filterKW(item, booleanField)
  })

  myMarkers = makeMarkers(filter_data)
  plotMarkers(myMarkers);

};
