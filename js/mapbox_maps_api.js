"use strict";

mapboxgl.accessToken = mapboxToken

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/nathan-adcock43/cknaq3bgr0nkq18mkwxs8i8c7', // style URL
    center: [-98.4861, 29.4252], // starting position [lng, lat]
    zoom: 15, // starting zoom
});

var markerHeight = 50, markerRadius = 10, linearOffset = 25;
var popupOffsets = {
    'top': [0, 0],
    'top-left': [0,0],
    'top-right': [0,0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};

geocode("530 W Wildwood dr. San Antonio, TX", mapboxToken).then(function(results){
    new mapboxgl.Marker()
        .setLngLat(results)
        .addTo(map)
        .setPopup(new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'}).setHTML("<h1>My House!</h1>"))
    console.log(results);

    map.flyTo({center: results, zoom: 7});

});




