window.onload = init;

function init() {
    var myString = prompt("Enter a string:");
    try {
        var len = myString.length;
        if (len == 0) {
            throw new Error("You didn't enter anything. Try again.");
        }
        else {
            displayLength(myString, len);
        }
    }
    catch (ex) {
        displayError(ex.message);
    }
    finally {
        displayMessage("Thanks for trying!");
    }
}

function displayError(e) {
    var error = document.getElementById("error");
    error.innerHTML = e;
}

function displayLength(myString, len) {
    var stringInfo = document.getElementById("stringInfo");
    stringInfo.innerHTML = "The string '" + myString + "' has length: " + len;
}

function displayMessage(m) {
    var msg = document.getElementById("msg");
    msg.innerHTML = m;
}