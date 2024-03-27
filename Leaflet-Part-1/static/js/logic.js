// Create the initial map object
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


// Store our API endpoint as the query url
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query url
d3.json(url).then(function (data) {
    console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Create function for circle appearance, calling markerSize and markerColor
function customCircle(data){

    return {
        color: "#000000",
        fillColor: markerColor(data.geometry.coordinates[2]),
        radius: markerSize(data.properties.mag),
        opacity: 1,
        fillOpacity: 0.75,
        stroke: true,
        weight: 0.5
    };
}

// Create function to add interactive marker
function createFeatures(data) {
    L.geoJSON(data, {
        
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, customCircle(feature));
        
        },
       
        
        onEachFeature: function(feature, latlng){
            latlng.bindPopup(
                `Magnitude: `+feature.properties.mag
                +`<br>Depth: `+feature.geometry.coordinates[2]
                +`<br>Location: `+feature.properties.place
            );
        }

    }).addTo(myMap);
}


// Create a function to link the size to magnitude
function markerSize(item) {
    
    if (item  ===  0) {
        return 1
    }
    return item * 5;
}

// Create a function to link depth and color
function markerColor(item) {
    if (item >= 16) {
        return "#FF5F65";
    } else if (item >= 12) {
        return "#FCA35D";
    } else if (item >= 7) {
        return "#F7DB11";
    } else if (item >= 2) {
        return "#e8f75e";
    } else {
        return "#A3F600";
    }
}



// Create the legend and add to map
let legend = L.control({position: "bottomright"});

legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let colors = ["#A3F600", "#e8f75e", "#F7DB11", "#FCA35D", "#FF5F65"];
    let labels = [-3, 2, 7, 12, 16];

    for (let i = 0; i < labels.length; i++) {
        // Create HTML content for each legend item
        div.innerHTML += "<div><i style='background: " + colors[i] + "'></i> "
          + "<span>" + labels[i] + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+") + "</span></div>";
    }
    return div;
};

legend.addTo(myMap);