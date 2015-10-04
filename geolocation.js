function findLocation() {
    navigator.geolocation.getCurrentPosition(displayLocation);
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    addFeature("Just used Geolocation to get your Lat/Long: " + latitude + ", " + longitude);
}