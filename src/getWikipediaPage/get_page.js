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

function getPage(tag) {
	return $.get("en.wikipedia.org/wiki/"+tag)

	.done(function(data, status){
		console.log(data);
		// formatPage(data);
	})
	.fail(function(data, status) {
		console.log("data acquisition failed");
	});

}

function formatPage(data) {
	
}