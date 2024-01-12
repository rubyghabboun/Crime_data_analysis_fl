// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".

let layers = {
  COUNTIES: new L.LayerGroup()
  
};
let myMap = L.map("map", {
  center: [27.9944026, -81.760254],
  zoom: 7,
  layers: [
    layers.COUNTIES]
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let overlays = {
  "Counties": layers.COUNTIES };

  L.control.layers(null, overlays).addTo(myMap);
  
  var countyNames = ["Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte", "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia", "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee", "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson", "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee", "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "Santa Rosa" ,"Sarasota" ,"Seminole" ,"St. Johns", "St. Lucie", "Sumter", "Suwannee", "Taylor", "Union" ,"Volusia" ,"Wakulla", "Walton" ,"Washington"];

 countyNames.forEach(function(county) { 
  
  //let countyfile = "FL_county_boundries"+county+".geo.json"
  fetch("FL_county_boundries/"+county+".geo.json")
  .then(function(response) {
      return response.json()
  })
  .then(function(data) {
      L.geoJson(data).addTo(layers.COUNTIES);
  })
  .catch(function(error) {
      console.log(`This is the error: ${error}`)
  })
});
