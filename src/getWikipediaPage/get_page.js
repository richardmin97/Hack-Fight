/*
var randomURL;	
	$.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
    	$.each(data.query.pages, function(k, v) {
        	$.getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
            	$.each(url.query.pages, function(key, page) {
                	//console.log(page); // contains the page data
                	randomURL = page.fullurl; // the url to the page
                	//console.log(randomURL);
            	});
        	});
    	});
	});
*/

Firebase.enableLogging(true);

//var ref = new Firebase('https://vivid-heat-3174.firebaseio.com');


function getRandomPage() {
	
	var randomURL;	
	console.log("before getting url");
	$.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
		console.log("1");
    	$.each(data.query.pages, function(k, v) {
    		console.log("2");
        	$.getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
        		console.log("3");
            	$.each(url.query.pages, function(key, page) {
                	//console.log(page); // contains the page data
                	return(page.fullurl); // the url to the page
                	//console.log(randomURL);
                	//return randomURL;
            	});
        	});
    	});
	});


	//console.log("asdlkfj" + randomURL);
	//return randomURL;
}


var waiting = true;

function login(){ // Call this function to start
    var frame = document.getElementsByTagName('iframe')[0];
    frame.src = "http://en.wikipedia.org/wiki/Jorm";
    waiting = true;
}

function callback(){ // This gets called once the page loads
    console.log(count);
    count = 0;
}

var count = 0;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    console.log("ran");
    if(request.loaded && waiting){
        // If you used a pattern, do extra checks here:
        if(request.loaded == "http://en.wikipedia.org/wiki/Sweden")
        {
            console.log("hallo");
            var playerData = ref.child("Lobby");

            //document.getElementsByTagName('iframe')[0].src = "about::blank";
            document.getElementById("wrapper").innerHTML = "<p>Waiting for other player</p>";

            if(playerNum == 1)
                console.log("player 1");
            else
                console.log("player 2");
       		waiting = false;
      		callback();
        }
        else
        	count++;
        
    }
});
