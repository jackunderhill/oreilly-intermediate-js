function init() {
    addBoxShadow();
    findLocation();
    storeSomething("favFlavor", "Vanilla Chocolate Chip");
}

function addFeature(featureMessage) {
    var ul = document.getElementById("features");
    var li = document.createElement("li");
    li.innerHTML = featureMessage;
    ul.appendChild(li);
}