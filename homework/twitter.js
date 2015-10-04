// empty array for tweet objects
var tweets = [];

window.onload = init;

// run function to get JSON once the page has loaded
function init() {
    getTweets();
}

function getTweets() {

    // create new request and get json
    var request = new XMLHttpRequest();
    request.open('GET','twitter.json');
    
    // when the request is ready
    request.onreadystatechange = function() {
        // if the data request returns
        if (this.readyState == this.DONE && this.status == 200) {
            // if there is data
            if (this.responseText) {
                // parse JSON
                parseTweetsData(this.responseText);
                // then add tweets to our html
                addTweetsToPage();
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };

    // send the request
    request.send();

}

function parseTweetsData(tweetsJSON) {
    if (tweetsJSON == null || tweetsJSON.trim() == "") {
    	// if the JSON is null or empty, return out of the function
        return;
    }
    // create the tweets array
    var tweetsArray = JSON.parse(tweetsJSON);
    if (tweetsArray.length == 0) {
    	// display error if tweets array is empty
        console.log("Error: the to-do list array is empty!");
        return;
    }
    // otherwise loop through each set of tweet data and push it to the global tweets array
    for (var i = 0; i < tweetsArray.length; i++) {
        var tweetItem = tweetsArray[i];
        tweets.push(tweetItem);
    }
}

function addTweetsToPage() {
    // get the list from our html
    var ul = document.getElementById("tweets");
    // create a new list item for every tweet in the tweet array
    for (var i = 0; i < tweets.length; i++) {
        var tweetItem = tweets[i];
        var li = document.createElement("li");
        // use only the twitter profile and text for the list items
        li.innerHTML = tweetItem.user.screen_name + " : " + tweetItem.text;
        // add the new list item to our list
        ul.appendChild(li);
    }
}  
