var Player = 
{
	UID: "simplelogin:-1",
	elo: -1,

	inLobby: false,
	lobbyNumber: -1,
	lobbyPlayerNum: -1,

	randomURL: ""
};


$.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
	$.each(data.query.pages, function(k, v) {
    	$.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
        	$.each(url.query.pages, function(key, page) {
                	Player.randomURL = page.fullurl; 
        	});
    	});
	});
});