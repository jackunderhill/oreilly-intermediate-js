window.onload = init;

function init() {
    // bind form validation function to submit button
    var submit = document.getElementById('submit');
    submit.onclick = validateForm;
}

function validateForm() {
    // get input value
    var dateInput = document.getElementById('dateInput');
    var inputValue = dateInput.value;
    // create regular expression to match value against
    var regex = new RegExp("[0-9]{4}\.[0-9]{2}\.[0-9]{2}[ ][0-1]?[0-9][:][0-5][0-9][a|p][m]");
    // remove any accidental spaces from string
    inputValue = inputValue.trim();

    // alert if string is not correct format
    var match = inputValue.match(regex);
    if (match == null) {
        alert('Please enter a date in this format: \nYYYY.MM.DD hh:mmam/pm');
    }
    else {
        // get date and time if string is correct format
        getTimes(match);
    }
}

function getTimes(match) {
    // split string into the date and time
    var fullDate = match[0].split(" ");
    var dateVal = fullDate[0];
    var timeVal = fullDate[1];

    // run the display function with these values
    displayTime(dateVal, timeVal);
}

function displayTime(dateVal, timeVal) {
    // display date and time in the page
    var date = document.getElementById('date');
    date.innerHTML = "Date: " + dateVal + ", Time: " + timeVal;
}