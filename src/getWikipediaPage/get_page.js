var randomTag;	
	$.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
    	$.each(data.query.pages, function(k, v) {
        	$.getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
            	$.each(url.query.pages, function(key, page) {
                	//console.log(page); // contains the page data
                	randomTag = page.title; // the url to the page
                	//console.log(url);
            	});
        	});
    	});
	});



var waiting = true;

function login(){ // Call this function to start
    var frame = document.getElementsByTagName('iframe')[0];
    frame.src = "http://en.wikipedia.org/wiki/Jorm";
    waiting = true;
}

function callback(){ // This gets called once the page loads
    console.log(count);
}

var count = 0;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    console.log("ran");
    if(request.loaded && waiting){
        // If you used a pattern, do extra checks here:
        if(request.loaded == "http://en.wikipedia.org/wiki/Sweden")
        {
            console.log("hallo");
            document.getElementsByTagName('iframe')[0].src = "about:blank";
       		waiting = false;
      		callback();
        }
        else
        	count++;
        
    }
});