function Todo(id, task, who, dueDate) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = false;
}

var todos = [];
var todosWho = [];
var todosTasks = [];

window.onload = init;

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;
    
    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;

    getTodoItems();
}

function getTodoItems() {
    if (localStorage) {
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
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    li.setAttribute("id", todoItem.id);
    
    var spanTodo = document.createElement("span");
    spanTodo.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;

    var spanDone = document.createElement("span");

    // add update click event
    spanDone.onclick = updateDone;

    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }
    
    // add the delete link    
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

    spanDelete.onclick = deleteItem;

    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);
    
    return li;
}

function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;

    var id = (new Date()).getTime();
    console.log("New task: " + task + ", for: " + who + ", by: " + date);
    var todoItem = new Todo(id, task, who, date);
    todos.push(todoItem);
    addTodoToPage(todoItem);
    saveTodoItem(todoItem);
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

function saveTodoItem(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
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

function searchTodos() {

    // get search term
    var searchTerm = document.getElementById("searchTerm").value;

    // display error message if search input is blank
    if (searchTerm == null || searchTerm == "") {
        alert("Please enter a search term");
        return;
    }

    // empty for matched todo ojects
    var results = [];

    // create regex from search term
    searchTerm = searchTerm.trim();
    var re = new RegExp(searchTerm, "ig");

    // loop through tasks and assignees
    if (todos.length > 0) {
        for (var i = 0; i < todos.length; i++) {

            // store any matches variable for taks and assignees
            var whoResult = todos[i].task.match(re);
            var taskResult = todos[i].who.match(re);

            if (whoResult || taskResult) {
                // if either task or assignee is a match, push object to results array
                results.push(todos[i]);
            }

        }
    }
    else {
        alert('You have no todo items yet');
    }

    // if there are results, display results
    if (results.length > 0) {
        displayResults(results);
    }
    // if there are no results, display message
    else {
        var ul = document.getElementById("resultsList");
        ul.innerHTML = '<p>Sorry, there are no results matching your search</p>'
    }

}


function displayResults(results) {

    // get results list
    var ul = document.getElementById("resultsList");

    // remove any old results
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    // create new list items for each results object
    var frag = document.createDocumentFragment();
    for (var i = 0; i < results.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = results[i].who + " needs to " + results[i].task + " by " + results[i].dueDate;results[i];
        frag.appendChild(li);
    }

    // display search results in list
    ul.appendChild(frag);

}