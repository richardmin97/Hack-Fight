var waiting = true;
var win = 0;
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
    //gameOver
    console.log("both done");
    gameOver();
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
            if(p1done == true && p2done == true){
                playerData.update({
                    "Winner": 1
                });
                
            }
       		waiting = false;
            console.log("going to callback");
      		callback();
        }
        else
        	count++;
        
    }
});

function gameOver(){
    ref.once("value", function(snapshot){
        var data = snapshot.val();
        if(data.Lobby.P1Clicks == data.Lobby.P2Clicks){  //same number of clicks so compare times
            if(data.Lobby.StartTimeP1 < data.Lobby.StartTimeP2)
                win = 1;
            else
                win = 2;
        }
        else{
            if(data.Lobby.P1Clicks < data.Lobby.P2Clicks)
                win = 1;
            else
                win = 2;
        }
    });

    switch(win){
        case 1: //player 1 wins
            if(playerNum == 1)
                displayPage(1);
            else
                displayPage(2);
            break;
        case 2: //player 2 wins
            if(playerNum == 2)
                displayPage(1);
            else
                displayPage(2);
            break;
        case 3: //time runs out. everyone loses
            displayPage(3);
            break;

    }
}

function displayPage(num){
    console.log("displaying");
    var html, html2;
    switch(num){
        case 1:
            html = "<p>Congrats you win!!!</p><br>";
            break;
        case 2:
            html = "<p>You lose. you suck</p><br>";
            break;
        case 3:
            html = "<p>Tie</p><br>";
            break;
    }
    //var winHTML = "<p>Congrats you win!</p><br>" + "Number of Clicks: " + ;
    ref.once("value", function(snapshot){
        console.log("snapshot thing");
        var data = snapshot.val();
        var html2 = "<p>Player 1 Stats       Player 2 Stats</p><br>"
            "<p>Clicks: " + data.P1Clicks + "      " + data.P2Clicks + "</p><br>" +
            "<p>Time: " + data.StartTimeP1 + "       " + data.StartTimeP2 + "</p><br>";
    });

    console.log(" sdfkj " + html2);
    document.getElementById("wrapper").innerHTML = html + html2; 
    //document.getElementById("wrapper").innerHTML += 
}

