var waiting = true;
var done = false;
var endURL = "";

var BeginPagePointer = new Firebase("https://vivid-heat-3174.firebaseio.com/Lobby/BeginPage");
var EndPagePointer = new Firebase("https://vivid-heat-3174.firebaseio.com/Lobby/EndPage");
function login(){ // Call this function to start
    var frame = document.getElementsByTagName('iframe')[0];
    // frame.src = ref.child("Lobby").BeginPage;
    BeginPagePointer.once("value", function(snapshot) {
        console.log(snapshot.val());
        frame.src = snapshot.val();
    }, function (errorObject) {
        console.log("reading the beginning url failed: " + errorObject.code);
    });

    EndPagePointer.once("value", function(snapshot) {
        console.log(snapshot.val());
        endURL = snapshot.val();
    }, function (errorObject) {
        console.log("reading the ending url failed: " + errorObject.code);
    })

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
        if(request.loaded == endURL)
        {
            var playerData = ref.child("Lobby");
            //WRONG
            document.getElementById("wrapper").innerHTML = "<p>Waiting for other player</p>";
            var time = 180 - (min*60 + sec);
            if(playerNum == 1){
                console.log("player 1");

                playerData.update({
                    "P1Clicks": count,
                    "StartTimeP1": time
                });
                p1done = true;
            }
            else{
                console.log("player 2");
                playerData.update({
                    "P2Clicks": count,
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
