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
        opacity: 1,
        fillOpacity: 1,
        stroke: true,
        weight: 0.5
    };

}

function createFeatures(data) {
    L.geoJSON(data, {
        
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
            //.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        
        },
        style: customCircle,
        
        onEachFeature: function(feature, latlng){
            latlng.bindPopup(
                `Magnitude: `+feature.properties.mag
                +`<br>Depth: `+feature.geometry.coordinates[2]
                +`<br>Location: `+feature.properties.place
            );
        }

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
        return "#FF5F65";
    }
    else if (item >= 70) {
        return "#FCA35D";
    }
    else if (item >= 50) {
        return "#FDB72A";
    }
    else if (item >= 30) {
        return "#F7DB11";
    }
    else if (item >= 10) {
        return "#FDB72A";
    }
    else {
        return "#A3F600";
    }
}



//add legend
let legend = L.control({position: "bottomright"});

legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let colors = ["#A3F600", "#FDB72A", "#F7DB11", "#FDB72A", "#FCA35D", "#FF5F65"];
    let labels = [-10, 10, 30, 50, 70, 90];

    for (let i = 0; i < labels.length; i++) {
        // Create HTML content for each legend item
        div.innerHTML += "<div><i style='background: " + colors[i] + "'></i> "
          + "<span>" + labels[i] + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+") + "</span></div>";
    }
    return div;
};

legend.addTo(myMap);