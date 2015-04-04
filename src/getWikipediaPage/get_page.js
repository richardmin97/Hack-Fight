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


function getRandomPage() {
	getPage(randomTag);
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