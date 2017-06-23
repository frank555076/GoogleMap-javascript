var map;

var service;

function handleSearchResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({
                position: results[i].geometry.location,
                map: map,
<<<<<<< HEAD
<<<<<<< HEAD
                icon: '\\images\\policeSign.png'
            }); 
=======
                // icon: 'C:\\Users\\ASUS-NB\\Desktop\\McdonaldsLogo.png'
            });
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======
                // icon: 'C:\\Users\\ASUS-NB\\Desktop\\McdonaldsLogo.png'
            });
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
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
<<<<<<< HEAD
<<<<<<< HEAD
    var socket = io();
    // var currentLocation = new google.maps.LatLng(24.99, location.coords.longitude)
    
    socket.on('location', function(msg){
            var currentLocation = new google.maps.LatLng(parseFloat(msg.latitude), parseFloat(msg.longitude))
            // console.log(msg.longitude)
            // console.log(location.coords.latitude)

=======
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
    // var socket = io();
    // socket.on('location', function(msg){
    //         // var currentLocation = new google.maps.LatLng(msg)
    //     });
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
<<<<<<< HEAD
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
    var mapOptions = {
        center: currentLocation,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
<<<<<<< HEAD
<<<<<<< HEAD

    var trafficLayer = new google.maps.TrafficLayer();

        if (trafficLayer.getMap()) {
            trafficLayer.setMap(null);
        } else {
            trafficLayer.setMap(map);
        }

=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map
    });

    service = new google.maps.places.PlacesService(map);

    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
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

    // traffic
<<<<<<< HEAD
<<<<<<< HEAD
    // var trafficLayer = new google.maps.TrafficLayer();
    // $('#traffic').click(function() {

    //     if (trafficLayer.getMap()) {
    //         trafficLayer.setMap(null);
    //     } else {
    //         trafficLayer.setMap(map);
    //     }
    // });
=======
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
    var trafficLayer = new google.maps.TrafficLayer();
    $('#traffic').click(function() {

        if (trafficLayer.getMap()) {
            trafficLayer.setMap(null);
        } else {
            trafficLayer.setMap(map);
        }
    });
<<<<<<< HEAD
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96

    // weather
    var weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
    });

    var cloudLayer = new google.maps.weather.CloudLayer();

    $('#weather').click(function() {

        if (weatherLayer.getMap() || cloudLayer.getMap()) {
            weatherLayer.setMap(null);
            cloudLayer.setMap(null);
        } else {
            weatherLayer.setMap(map);
            cloudLayer.setMap(map);
        }
    });
<<<<<<< HEAD
<<<<<<< HEAD
        });

    var trafficLayer = new google.maps.TrafficLayer();
    $('#traffic').click(function() {

        if (trafficLayer.getMap()) {
            trafficLayer.setMap(null);
        } else {
            trafficLayer.setMap(map);
        }
    });
    
   
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======
>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
}

// wait until the web to be ready
$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(initialize);
});

// socket.io communication with server

// $(function () {
//     var socket = io();
//     socket.on('location', function(msg){
<<<<<<< HEAD
<<<<<<< HEAD
//     console.log(msg)
=======

>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
=======

>>>>>>> 2d006b29c276162a0fffb4a62a12fcf167781a96
//     });
// });