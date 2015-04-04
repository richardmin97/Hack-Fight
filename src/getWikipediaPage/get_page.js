function getRandomPage() {

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