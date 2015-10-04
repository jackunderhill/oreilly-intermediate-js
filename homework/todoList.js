window.onload = init;

function init() {
  getList(); 
}

function getList() {
  // create the request
  var request = new XMLHttpRequest();
  
  // get to do list
  request.open("GET", "todoList.json");
  
  // when it's ready
  request.onreadystatechange = function() {
  
    // get divs
    var list = document.getElementById("todoList");
    var status = document.getElementById("status");
    
    // if the request got a response correctly
    if(this.readyState == this.DONE && this.status == 200) {

      // if the reponse contained data
      if (this.responseText != null) {
        
        // insert data into page
        list.innerHTML = this.responseText;
        status.innerHTML = this.status;
      }
      else {
        // show if there was an error
        list.innerHTML = "Error: no data";
      }
    
    }
  
  };
  
  // send the request
  request.send();
  
}