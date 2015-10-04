window.onload = init;

function init() {
    var date = document.getElementById('date');
    getDays();
}

function getDays() {
    // get the start second of the 21st century
    var start = new Date(2000, 0, 0, 0, 0, 0, 0);

    // get the end second on the 21st centry
    var end = new Date(2099, 11, 31, 11, 59, 59, 0);

    // show the difference in seconds
    var difference = (end - start)/1000/60/60/24;
    date.innerHTML = difference;
}