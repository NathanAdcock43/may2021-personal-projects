"use strict";

mapboxgl.accessToken = mapboxToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nathan-adcock43/cknaq3bgr0nkq18mkwxs8i8c7',
    center: [-98.48, 29.42], // starting position
    zoom: 3 // starting zoom
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

    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        lon: results [0],
        lat: results [1],
        appid: openweatherToken,
        units: "imperial",
        exclude: "current,minutely,hourly,alerts",
    }).done(function(results) {
        console.log(results);
    });
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast, //API Call",
        dataType: "json",
        type: "GET",
        data: {
            q: results,
            appid: openweatherToken,
            cnt: "10"
        },
        success: function(data) {
            console.log('Received data:', data) // For testing
            var wf = "";
            wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
            $.each(data.list, function(index, val) {
                wf += "<p>" // Opening paragraph tag
                wf += "<b>Day " + index + "</b>: " // Day
                wf += val.main.temp + "&degC" // Temperature
                wf += "<span> | " + val.weather[0].description + "</span>"; // Description
                wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                wf += "</p>" // Closing paragraph tag
            });
            $("#showWeatherForcast").html(wf);
        }
    });
});


var key = "YOUR KEY";
var city = "YOUR CITY"; // My test case was "London"
var url = "https://api.openweathermap.org/data/2.5/forecast";



// map.wms = function(template, name) {
//     function _wms_provider(template) {
//         MM.MapProvider.call(this, function(coordinate) {
//             var coord = this.sourceCoordinate(coordinate);
//             if (!coord) return null;
//             var center = Math.pow(2, coord.zoom - 1),
//                 incr = Math.pow(2, -coord.zoom) * 20037508.34 * 2,
//                 w = (coord.column - center) * incr,
//                 s = (center - coord.row - 1) * incr;
//             return template.replace('{BBOX}', [w,
//                 s,
//                 w + incr,
//                 s + incr].join(','));
//         });
//     }
//     _wms_provider.prototype = {
//         getTile: function(coord) {
//             return this.getTileUrl(coord);
//         }
//     };
//     MM.extend(_wms_provider, MM.MapProvider);
//     return new MM.Layer(new _wms_provider(template), null, name);
// };
//
// // This WMS layer type only supports layers that provide the Spherical
// // Mercator projection, referred to by EPSG:900913 and EPSG:3857
// // Add a WMS layer by adding the {BBOX} token to a GetTile request URL
// map.auto('map', 'lxbarth.map-mejpxnkf', function(mapx) {
//     map.zoom(5).center({ lat: 45, lon: -80 });
//
//     var radar = map.wms('http://tile.openweathermap.org/wms?LAYERS=RADAR.12KM&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=true&FORMAT=image%2Fpng&STYLES=&SRS=EPSG%3A900913&BBOX={BBOX}&WIDTH=512&HEIGHT=512', 'Radar');
//     mapx.addLayer(radar);
//
//     document.getElementById('radar').onclick = function() {
//         (!radar.enabled) ? radar.enable() : radar.disable();
//         this.className = radar.enabled ? 'active' : '';
//         return false;
//     }
// });
//

//

// TODO: How can we get imperial units instead?

// TODO: What are some additional ways we can get the weather from this API?

//TODO: How can we incorporate mapbox with this? How can we make it dynamic?

// TODO: Explore the docs... what endpoint can we use to get a forecast?

// TODO: What parameter can we include in order to get the daily forecast only