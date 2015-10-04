window.onload = init;

function init() {
    var submit = document.getElementById("submit");
    submit.onclick = getDate;
}    
function getDate() {
    var aDate;
    var aDateString = document.getElementById("aDate").value;
    if (aDateString == null || aDateString == "") {
        alert("Please enter a date");
        return;
    }
    var aDateMillis = Date.parse(aDateString);
    try {
        if (isNaN(aDateMillis)) {
            throw new Error("Date format error. Please enter the date in the format MM/DD/YYYY, YYYY/MM/DD, or January 1, 2012");
        }
        else {
            aDate = new Date(aDateMillis);
        }
        var datetime = document.getElementById("datetime");
        datetime.innerHTML = aDate.toLocaleString();
    }
    catch (ex) {
        alert(ex.message);
    }
} 