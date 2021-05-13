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
  myMarkers.map(function(marker){
    map.removeLayer(marker)
  });
  return map
};


/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function(){
  /* =====================
    Fill out this function definition
  ===================== */
  var downloadData = $.ajax("http://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/json/world-country-capitals.json");
  downloadData.done(function(res) { 
    var parsed = JSON.parse(res)
    markerData = parsed
  })
};


/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */


var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  
  //Clear the markers plotted last time
  myMarkers=[]
  popup=[]

  console.log(markerData.length)

  //Filter capitals whose latitudes are within a certain range
  if (numericField1 !== "" && numericField2 !== ""){
    if (numericField1 <= numericField2){
      filtered = _.filter(markerData, function(cap){
        return Math.abs(cap.CapitalLatitude)>numericField1 && Math.abs(cap.CapitalLatitude) < numericField2
      });
    }
    else{
      filtered = _.filter(markerData, function(cap){
        return Math.abs(cap.CapitalLatitude)>numericField2 && Math.abs(cap.CapitalLatitude) < numericField1
      });
    }
  }
  else if(numericField1 !== "" && numericField2 == ""){
    filtered = _.filter(markerData, function(cap){
      return Math.abs(cap.CapitalLatitude) >numericField1
    });
  }
  else if(numericField1 == "" && numericField2 !== ""){
    filtered = _.filter(markerData, function(cap){
      return Math.abs(ap.CapitalLatitude) < numericField2
    });
    
  }
  else{
    filtered = markerData
  }

  // Filter capitals whose name is included in the stringField.
  if(stringField !== ""){
    filtered = _.filter(filtered, function(cap){
      return cap.ContinentName.toLowerCase().includes(stringField.toLowerCase()) ||
      cap.CountryName.toLowerCase().includes(stringField.toLowerCase()) ||
      cap.CapitalName.toLowerCase().includes(stringField.toLowerCase())
    })
  }

  console.log(filtered)

  //Create markers
  filtered.forEach(function(capital){  
    lat = capital.CapitalLatitude;
    lng = capital.CapitalLongitude;
    text = capital.CapitalName + ", \n" + capital.CountryName+ ", \n" + capital.ContinentName;
    marker = L.marker([lat, lng])
    myMarkers.push(marker)
    popup.push(text)
  })
  console.log(myMarkers)
  
  //Plot the markers. 
  //If the booleanField == true, add a popup to each marker.
  //If the booleanField == false, do not add popups.
  if(booleanField == true){
    for (i = 0; i < myMarkers.length; i += 1) {
      myMarkers[i].addTo(map).bindPopup(popup[i]).openPopup()
    }  
  }
  else{
    myMarkers.forEach(function(m){
      m.addTo(map)
    })
  }


}
