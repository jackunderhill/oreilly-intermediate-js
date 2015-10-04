function storeSomething(key, item) {
    localStorage.setItem(key, item);
    addFeature("Just stored " + key + ", " + item + " in Local Storage");
}