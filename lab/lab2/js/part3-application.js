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
    map.removeLayer(marker);
  });
  myMarkers = [];
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var parsed = [];
var getAndParseData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-solar-installations.json");
  downloadData.done(function(data) {
    parsed = JSON.parse(data);;
  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  var numFiltered = [];
  var strFiltered = [];
  var finalFiltered = [];

  if (checkNum(numericField1, numericField2)){
    numFiltered = _.filter(parsed, function(data){
      return ((data.YEARBUILT >= numer1) && (data.YEARBUILT <= numericField2));
    })
  };

  if (_.isString(stringField)){
    strFiltered = _.filter(parsed, function(data){
      return data.ZIPCODE == stringField;
    })
  }

  if (booleanField){
    finalFiltered = _.intersection(numFiltered, strFiltered);
  } else {
    finalFiltered = _.union(numFiltered, strFiltered);
  }

  _.each(finalFiltered, function(item){
    myMarkers.push(L.marker([item.Y, item.X]).bindPopup(`${item.NAME} built in ${item.YEARBUILT}`))
  })
  _.each(myMarkers, function(marker){
    marker.addTo(map);
  })

};


function checkNum(num1, num2){
  var validNum = false
  if (_.isNumber(num1) && _.isNumber(num2)){
    if (num2 >= num1){
      validNum = true
    };
  return validNum;
  };
};

