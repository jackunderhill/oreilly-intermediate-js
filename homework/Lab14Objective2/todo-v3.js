function Todo(id, task, who, dueDate, longitude, latitude) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.longitude = longitude;
    this.latitude = latitude;
    this.done = false;
}

var todos = [];
var todosWho = [];
var todosTasks = [];
var currentLat = '';
var currentLong = '';
var map = null;

window.onload = init;

function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getTodoData;

    var searchButton = document.getElementById("searchButton");
    searchButton.onclick = searchTodos;

    getLocation();
    getTodoItems();
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

    addDataToSpan(spanTodo, todoItem);

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

function getTodoData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    console.log(date)
    var id = (new Date()).getTime();

    // set current longitude and latitude
    getLocation();

    // check for errors in date processing
    try {
        if (isNaN(Date.parse(date))) {
            throw new Error("Date format error. Please enter the date in the format MM/DD/YYYY, YYYY/MM/DD, or January 1, 2015");
        }
        else {
            var todoItem = new Todo(id, task, who, date, currentLong, currentLat);
            todos.push(todoItem);
            addTodoToPage(todoItem);
            saveTodoItem(todoItem);
        }
    }
    catch (ex) {
        alert(ex.message);
    }
}

function timeDifference(date) {

    // get date to compare
    var date = Date.parse(date);

    // get current time
    var now = new Date();

    // reset everything but the date to zero for comparison
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    now = Date.parse(now);

    // get difference
    var diff = (date - now)/1000/60/60/24;

    // round up to whole day
    diff = Math.floor(diff);

    // if the difference is -1 day
    if (diff < 0 && diff > -2) {
        var dueBy = "(" + Math.abs(diff) + " day overdue)";
    }
    // if the difference is more than -1 days
    else if (diff <= -2) {
        var dueBy = "(" + Math.abs(diff) + " days overdue)";
    }
    // if the difference is +1 day
    else if (diff === 1) {
        var dueBy = "(due in " + diff + " day)";
    }
    // if the difference is more than +1 days
    else if (diff > 1) {
        var dueBy = "(due in " + diff + " days)";
    }
    else {
        var dueBy = "(due today)";
    }

    // return our due/overdue message
    return dueBy;
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

            // store any matches variable for tasks and assignees
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
