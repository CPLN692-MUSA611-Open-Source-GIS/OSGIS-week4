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
  myMarkers.forEach(function(markerEntry){map.removeLayer(markerEntry)});
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
  // Download the crime snippet dataset
  downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/philadelphia-bike-crashes-snippet.json")
  downloadData.done(res => {
    parsed = JSON.parse(res);
    console.log(`Data Loaded Successfully. Type: ${parsed.type}`);
    console.log(parsed);
  });
}

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */

  numFiltered = [];
  stringFiltered = [];
  booleanFiltered = [];

  
  // A helper function to check if the numeric inputs are valid
  let isValidNumField = function(num){
    return num >= 1 & num <= 31;
  }


  // Check if the numerical fields for filtering have been correctly filled by user
  if (isValidNumField(numericField1) & isValidNumField(numericField2) & (numericField1 < numericField2)) {
    numFiltered1 = _.filter(parsed, function(data){
      return data.DATE_OF_MO >= numericField1;
    })
    numFiltered2 = _.filter(parsed, function(data){
      return data.DATE_OF_MO <= numericField2;
    })
    numFiltered = _.intersection(numFiltered1, numFiltered2)
    console.log(`${numFiltered.length} incidents happened starting from day ${numericField1} to day ${numericField2} of a month.`);
    console.log(numFiltered)
  } else if (isValidNumField(numericField1)){
    numFiltered = _.filter(parsed, function(data){
      return data.DATE_OF_MO >= numericField1;
    })
    console.log(`${numFiltered.length} incidents happened starting from day ${numericField1} of a month.`);
    console.log(numFiltered)
  } else if (isValidNumField(numericField2)){
    numFiltered = _.filter(parsed, function(data){
      return data.DATE_OF_MO <= numericField2;
    })
    console.log(`${numFiltered.length} incidents happened starting before day ${numericField2} of a month.`);
    console.log(numFiltered)
  } else {
    numFiltered = parsed;
  };


  // A helper function to check if the string input is one of the selected categories
  let isValidStrField = function(str){
    return (_.contains(["DRIVER_16Y", "DRIVER_17Y", "DRIVER_65_", "DRIVER_75P", "DRIVER_COU", "DRIVER_C_1", "DRIVER_C_2", "DRIVER_C_3"], str));
  }

  // Check if the string field for filtering have been correctly filled by user
  if (isValidStrField(stringField)) {
      stringFiltered = _.filter(parsed, function(data){
        return data[stringField] == 1;
      });
      console.log(`${stringFiltered.length} incidents happened involving ${stringField}.`)
      console.log(stringFiltered)
     } else { 
      stringFiltered = parsed;
  };

  // Apply boolean filter by user input (checked or not)
  if (booleanField) {
    booleanFiltered = _.filter(parsed, function(data){
      return data.DRINKING_D == 1;
    })
    console.log(`${booleanFiltered.length} incidents happened involving ALCOHOL.`)
    console.log(booleanFiltered)
  } else {
    booleanFiltered = parsed;
  }

  finalFiltered = _.intersection(numFiltered, stringFiltered, booleanFiltered);
  console.log(`The final intersection of filtered data include ${finalFiltered.length} incidents, as shown in the map.`)
  console.log(finalFiltered)


  var makeMarkers = function() {
    myMarkers = [];
    finalFiltered.forEach(function(entry){
      myMarkers.push(L.marker([entry.LAT, entry.LNG]).bindPopup(`Incident CRN: ${entry.CRN} <br> Crash Date: ${entry.CRASH_DATE}`));
    });
  };
  

  var plotMarkers = function() {
    myMarkers.forEach(function(markerEntry){markerEntry.addTo(map)});
  };

  makeMarkers();
  plotMarkers();
};
