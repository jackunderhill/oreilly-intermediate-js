window.onload = init;

var map = null;

function Thought(id, text) {
    this.id = id;
    this.text = text;
}

function init() {
    var submit = document.getElementById("submit");
    submit.onclick = getThought;
}

function getThought() {
    var aThought = document.getElementById("aThought").value;
    if (aThought == null || aThought == "") {
        alert("Please enter a thought with at least one word");
        return;
    }
    var id = (new Date()).getTime();
    var thought = new Thought(id, aThought);

    // get the location of the thought
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, locationError);
    }
    else {
        console.log("Sorry, no Geolocation support!");
        return;
    }
   
    addThoughtToPage(thought);
} 

function addThoughtToPage(thought) {
    var ul = document.getElementById("thoughts");
    var li = document.createElement("li");
    li.setAttribute("id", thought.id);

    var spanText = document.createElement("span");
    spanText.setAttribute("class", "thoughtText");
    spanText.innerHTML = thought.text;

    li.appendChild(spanText);
    ul.appendChild(li);
}           

function getLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    if (!map) {
        showMap(latitude, longitude);
    }
    addMarker(latitude, longitude);
}

function showMap(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
}

function addMarker(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "Where I'm thinking today"
    }
    var marker = new google.maps.Marker(markerOptions);
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
    alert(errorMessage);
}