// Cookie storage fallback

function getTodoItems() {
    // create a cookie array from the document.cookie string, split by their dividing semi-colons
    var cookieArray = document.cookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        // split the cookies into their virtual key/value pairs
        var cookiePair = cookieArray[i].trim(' ');
        cookiePair = cookiePair.split('=');

        // if the cookie is a todo item, push it to our global array
        if (cookiePair[0].substring(0, 4) == "todo") {
            var cookieItem = JSON.parse(cookiePair[1]);
            todos.push(cookieItem);
       }
    }

    addTodosToPage();
}

function saveTodoItem(todoItem) {
    // create cookie string from todo object
    var item = 'todo' + todoItem.id + '=' + JSON.stringify(todoItem);
    // add cookie with new string
    document.cookie = item;
}

function deleteItem(e) {
    var span = e.target;
    var id = span.parentElement.id;
    console.log("delete an item: " + id);
    
    // find and remove the item in cookies
    var item = "todo" + id + '=; expires=Thu, 01 Jan 1970 00:00:01 UTC';
    document.cookie = item;

    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }

    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);
}

function updateDone(e) {
    // get id of current selected element
    var id = e.target.parentElement.id;

    // create key that matches element in cookies
    var key = 'todo' + id;
    var item;
    var cookieArray = document.cookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        // split the cookies into their virtual key/value pairs
        var cookiePair = cookieArray[i].trim(' ');
        cookiePair = cookiePair.split('=');

        // if the cookie is a todo item, parse cookie item back into an object
        if (cookiePair[0] == key) {
            item = JSON.parse(cookiePair[1]);
       }
    }

    // update object, html and css
    if (item.done) {
        item.done = false;
        e.target.className = 'notDone';
        e.target.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        item.done = true;
        e.target.className = 'done';
        e.target.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    // save item back to cookies
    saveTodoItem(item);

    // find the selected item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {

            // update the done status for that object
            if (todos[i].done) {
                todos[i].done = false;
            }
            else {
                todos[i].done = true;
            }
            break;
        }
    }

}