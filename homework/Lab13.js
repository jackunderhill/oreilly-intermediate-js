window.onload = init;
          
function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getMyLocation, locationError);
    }
    else {
        console.log("Sorry, no Geolocation support!");
    }
}
function getMyLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    alert("My position is: " + latitude + ", " + longitude + "\n Accurate to " + accuracy + "M");
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
