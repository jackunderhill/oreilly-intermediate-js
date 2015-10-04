window.onload = init;

function init() {
    var futureDate = new Date();
    futureDate.setFullYear(2100);
    futureDate.setMonth(11);
    futureDate.setDate(21);
    futureDate.setHours(18);
    futureDate.setMinutes(0);
    futureDate.setSeconds(0);
    
    var date = document.getElementById('date');
    date.innerHTML = futureDate;
}