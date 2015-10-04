// colours array
var colours = [];

// object constructor for colours
function Colour(id, colour) {
    this.id     = id;
    this.colour = colour;
}

window.onload = init;

function init() {
    // get button
    var submit = document.getElementById('submit');
    submit.onclick = getColourData;

    // load any colours that have previously been added
    loadColours();
}

function loadColours() {
    if (localStorage) {
        // loop over localStorage items
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            // only access colour items
            if (key.substring(0, 6) == "colour") {
                // get value
                var item = localStorage.getItem(key);
                // create object with id and value
                var colour = new Colour(key, item);
                // push object to array
                colours.push(colour);
           }
        }
        // add items from localStorage into
        addColoursToPage();
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

// submit function
function getColourData() {
    // get form input values
    var input1 = document.getElementById('color1').value;
    var input2 = document.getElementById('color2').value;
    var input3 = document.getElementById('color3').value;
    var input4 = document.getElementById('color4').value;
    var input5 = document.getElementById('color5').value;

    // console.log(input1);

    // check that every value has an input
    if (input1 && input2 && input3 && input4 && input5) {
        // store in local storage
        storeColours(input1, input2, input3, input4, input5);
        // add colours in colours array to page
        addColoursToPage();
    }
    else {
        alert('Please enter five colours');
    }
}

function storeColours(input1, input2, input3, input4, input5) {
    // display colours in list
    var coloursArray = [input1, input2, input3, input4, input5];

    // check that we're not overwriting colours already in ths list
    for(i = 0; i < coloursArray.length; i++) {
        // set ID one higher than what has been set before
        var id = 'colour' + colours.length;

        // get clour value
        var val = coloursArray[i];

        // store in localStorage
        localStorage.setItem(id, val);
        
        // create object
        var colour = new Colour(id, val);
        
        // push to array
        colours.push(colour);
    }
}

function addColoursToPage() {
    // get list
    var list = document.getElementById('colors');

    // create document fragment
    var fragment = document.createDocumentFragment();
    
    // loop through colours array
    for (i = 0; i < colours.length; i++) {

        // create new list item with colour value
        var value = colours[i].colour;
        var listItem = document.createElement('li');
        listItem.innerHTML = value;
        
        // add to document fragment
        fragment.appendChild(listItem);
    }

    // clear contents of list
    list.innerHTML = '';
    // add content of fragment to list
    list.appendChild(fragment);
    
    // clear form
    document.forms[0].reset();
}