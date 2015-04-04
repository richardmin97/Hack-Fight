



function getWikipediaArticle(URL) {
	var xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET",URL,true);
xmlhttp.send();
}

function formatWikipediaArticle(URL) {
	var unformattedArticle = getWikipediaArticle(URL) ;

}