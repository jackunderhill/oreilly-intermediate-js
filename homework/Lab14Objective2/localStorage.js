function getTodoItems() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substring(0, 4) == "todo") {
            var item = localStorage.getItem(key);
            var todoItem = JSON.parse(item);
            todos.push(todoItem);
       }
    }
    addTodosToPage();
}

function saveTodoItem(todoItem) {
    var key = "todo" + todoItem.id;
    var item = JSON.stringify(todoItem);
    localStorage.setItem(key, item);
}

function deleteItem(e) {
    var span = e.target;
    var id = span.parentElement.id;
    console.log("delete an item: " + id);
    
    // find and remove the item in localStorage
    var key = "todo" + id;
    localStorage.removeItem(key);

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
    // create key that matches element in local storage
    var key = 'todo' + id;
    // turn parse local storage item back into an object
    var item = JSON.parse(localStorage.getItem(key));

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

    // parse object back into JSON
    var itemString = JSON.stringify(item);

    // save to item local storage
    localStorage.setItem(key, itemString);


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