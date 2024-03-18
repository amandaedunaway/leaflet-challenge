let myMap = L.map("map", {
    center: [40.7, -94.5
],
zoom: 5,
}
);

// Create the tile layer
let baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Add the tile layer to the map
baseMap.addTo(myMap);


// Store our API endpoint as queryUrl.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
    console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function customCircle(data){

    console.log("hello");
    return {
        color: "#95fc05",
        fillcolor: markerColor(data.geometry.coordinates[2]),
        radius: markerSize(data.properties.mag),
        opacity: 1
    };

}

function createFeatures(data) {
    L.geoJSON(data, {
        
        poinToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
        },
        style: customCircle
    
    }).addTo(myMap);
}


// magnitude by size
function markerSize(item) {
    //return item.properties.mag;
    if (item  ===  0) {
        return 1
    }
    return item * 5;
}

// depth by color
function markerColor(item) {
    //return item.geometry.coordinates[2];
    if (item >= 90) {
        return "#eb1a47";
    }
    else if (item >= 70) {
        return "#eb751a";
    }
    else {
        return "#95fc05";
    }
}



// incomplete for loop that adds circles and popup
// for (let i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "purple", // color will be markerColor, on a gradient as specified below
//       // Setting our circle's radius to equal the output of our markerSize() function:
      
//       radius: markerSize()
//     }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`).addTo(myMap);
//   }

  
//add cholorpleth
// L.choropleth()
// scale: ["#95fc05","#eb1a47"],


//add legend



