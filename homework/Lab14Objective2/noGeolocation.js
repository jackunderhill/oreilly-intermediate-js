function getLocation(callbackFunc) {
    console.log("Sorry, we can't get your location! No Geolocation available.");
}

function addDataToSpan(spanTodo, todoItem) {
    spanTodo.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate + " " + timeDifference(todoItem.dueDate);
}