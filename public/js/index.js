var map;

var service;

function handleSearchResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({
                position: results[i].geometry.location,
                map: map,
                icon: '\\images\\policeSign.png'
            }); 
        }
    }
}

function performSearch() {
    var request = {
        bounds: map.getBounds(),
        name: "Police Station"
    }
    service.nearbySearch(request, handleSearchResults);
}


function initialize(location) {
    // console.log(location);
    // // socket.io 
    var socket = io();
    // var currentLocation = new google.maps.LatLng(24.99, location.coords.longitude)
    
    // socket.on('location', function(msg){
            // var currentLocation = new google.maps.LatLng(parseFloat(msg.latitude), parseFloat(msg.longitude))
    // var currentLocation = new google.maps.LatLng(location.coords.longitude, location.coords.latitude)
        var currentLocation = new google.maps.LatLng(121.5654268, 25.0329636)
            // console.log(msg.longitude)
    // console.log(location.coords.latitude)
    // console.log(location.coords.longitude)

    var mapOptions = {
        center: currentLocation,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var trafficLayer = new google.maps.TrafficLayer();

        if (trafficLayer.getMap()) {
            trafficLayer.setMap(null);
        } else {
            trafficLayer.setMap(map);
        }

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map
    });

    service = new google.maps.places.PlacesService(map);

    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);


    // redo search when the refresh button is clicked
    $('#refresh').click(performSearch);

    // draw circle on map
    var circleOptions = {
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: "#0000FF",
        fillOpacity: 0.35,
        map: map,
        center: currentLocation,
        radius: 2000
    };
    var circle = new google.maps.Circle(circleOptions);

    var weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
    });

    var cloudLayer = new google.maps.weather.CloudLayer();


        // });

    var trafficLayer = new google.maps.TrafficLayer();

    
   
}

// wait until the web to be ready
$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(initialize);
});

    $('#weather').click(function() {

        if (weatherLayer.getMap() || cloudLayer.getMap()) {
            weatherLayer.setMap(null);
            cloudLayer.setMap(null);
        } else {
            weatherLayer.setMap(map);
            cloudLayer.setMap(map);
        }
    });

    $('#traffic').click(function() {

        if (trafficLayer.getMap()) {
            trafficLayer.setMap(null);
        } else {
            trafficLayer.setMap(map);
        }
    });