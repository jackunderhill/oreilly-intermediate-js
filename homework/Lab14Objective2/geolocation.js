function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(returnLocation, locationError);
}

function returnLocation(position) {
    currentLat = position.coords.latitude;
    currentLong = position.coords.longitude;

    if (!map) {
        showMap(currentLat, currentLong);
    }
    addMarker(currentLat, currentLong);
}

function locationError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    console.log(errorMessage);
}

function addDataToSpan(spanTodo, todoItem) {

    // only insert location data if it exists
    if (todoItem.latitude) {
        spanTodo.innerHTML =
            todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate + " " + timeDifference(todoItem.dueDate) + ". At the location: " + todoItem.latitude + ", " + todoItem.longitude;
    }
    else {
        spanTodo.innerHTML =
            todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate + " " + timeDifference(todoItem.dueDate);
    }
}

function showMap(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    // add .enabled to div so it has the right styles
    mapDiv.className = 'enabled';
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
}

function addMarker(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "Your Location"
    }
    var marker = new google.maps.Marker(markerOptions);
}