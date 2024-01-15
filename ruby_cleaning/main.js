// main.js

// Function to create the Leaflet map
//function createMap() {
    // map center and zoom level
  //  var map = L.map('map').setView([27.9944026, -81.760254], 7);

    // Add a tile layer 
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//    return map;
//}

// Function to read GeoJSON data and create layers
//function readGeoJSONAndCreateLayers(map) {
    // Array of county names
  //  var countyNames = ["Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte", "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia", "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee", "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson", "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee", "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "Santa Rosa" ,"Sarasota" ,"Seminole" ,"St. Johns", "St. Lucie", "Sumter", "Suwannee", "Taylor", "Union" ,"Volusia" ,"Wakulla", "Walton" ,"Washington"];
//var Alachua = "https://github.com/johan/world.geo.json/tree/master/countries/USA/FL/".concat("Alachua.geo.json")
    // Loop through each county
    //countyNames.forEach(function (county) {
        // Load GeoJSON file with county boundaries
        //fetch('FL_county_boundries' + county + '.geo.json')
  //     console.log(Alachua)
    //    fetch (Alachua,{mode:"no-cors"})
      //      .then(response => response.json())
        //    .then(data => {
                // Create a GeoJSON layer based on the loaded data
          //      var geojsonLayer = L.geoJSON(data, {
                    //  styling 
            //        style: {
              //          color: 'black',
                //        weight: 2,
                  //      fillOpacity: 0
                    //}
         //       });

                // Add the GeoJSON layer to the map
                //geojsonLayer.addTo(map);
     //       })
       //     .catch(error => {console.error('Error loading GeoJSON for ' + "county" + ':', error)});
    //});

    // Call the function to read CSV and create markers
    //readCSVAndCreateMarkers(map);
//}

// Function to read CSV data and create markers
//function readCSVAndCreateMarkers(map) {
    // Use PapaParse to read the CSV data
   // Papa.parse('filtered_data2.csv', {
    //    header: true,
    //    download: true,
    //    dynamicTyping: true,
      //  complete: function (result) {
            // Create a GeoJSON layer with markers based on the CSV data
        //    var geojsonLayer = L.geoJSON(result.data, {
          //      onEachFeature: function (feature, layer) {
            //        // Add pop-up content for each feature
              //      layer.bindPopup('<b>' + feature.properties.County + '</b><br>' +
                //        'Total Arrests: ' + feature.properties['Total Arrests'] + '<br>');
                //}
//            });
//
  //          // Add the GeoJSON layer with markers to the map
    //        geojsonLayer.addTo(map);
      //  }
 //   });
//}

// Call the functions to create and set up the map
//var map = createMap();
//readGeoJSONAndCreateLayers(map);

var Alachua = fetch("https://github.com/johan/world.geo.json/blob/master/countries/USA/FL/Alachua.geo.json")
console.log(Alachua)