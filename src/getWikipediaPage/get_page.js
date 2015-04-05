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

function getRandomPageID() {
	return $.getJSON("https://community-wikipedia.p.mashape.com/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?");
    
 //        function (data) 
 //    {
 //    	$.each(data.query.pages, function(k, v) 
 //        {
 //        	$.getJSON('https://community-wikipedia.p.mashape.com/api.php?action=query&prop=info&pageids='+v.pageid+'&inprop=url&format=json&callback=?',
 //             function(url) {
 //            	$.each(url.query.pages, function(key, page) 
 //                {
 //                	console.log(page); // contains the page data
 //                	// return(page.fullurl); // the url to the page
 //                	//console.log(randomURL);
 //                	//return randomURL;
 //            	});
 //        	});
 //    	});
	// });


	//console.log("asdlkfj" + randomURL);
	//return randomURL;
}


function getRandomPage() {
    getRandomPageID().done(function(data)
    {
        console.log(data);
        // $.each(data.query.pages)
    });
}

var waiting = true;
var done = false;

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
var p1done = false;
var p2done = false;

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
            var time = 180 - (min*60 + sec);
            if(playerNum == 1){
                console.log("player 1");

                playerData.update({
                    "P1CLICKS": count,
                    "StartTimeP1": time
                });
                p1done = true;
            }
            else{
                console.log("player 2");
                playerData.update({
                    "P2CLICKS": count,
                    "StartTimeP2": time
                });
                p2done = true;
            }
            if(p1done == true && p2done == true)
                playerData.update({
                    "Winner": 1
                });
       		waiting = false;
      		callback();
        }
        else
        	count++;
        
    }
});
