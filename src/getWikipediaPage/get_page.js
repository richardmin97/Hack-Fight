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
        //console.log("reading the ending url failed: " + errorObject.code);
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
            document.getElementById("wrapper").innerHTML = "<p>You Win!</p>";
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
                //callback();
                
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
        console.log("snapshot*******");
        var data = snapshot.val();
        if(data.Lobby.P1Clicks == data.Lobby.P2Clicks){  //same number of clicks so compare times
            console.log("clicks are equal");
            if(data.Lobby.StartTimeP1 < data.Lobby.StartTimeP2)
                win = 1;
            else
                win = 2;
        }
        else{
            //console.log("clicks are not equal");
            if(data.Lobby.P1Clicks < data.Lobby.P2Clicks)
                win = 1;
            else{
                win = 2;
                console.log("winner is 2");
            }
        } 
        console.log("win = " + win);
        switch(win){
        case 1: //player 1 wins
            console.log("p1 win");
            if(playerNum == 1)
                displayPage(1);
            else
                displayPage(2);
            break;
        case 2: //player 2 wins
            console.log("p2 win");
            if(playerNum == 2)
                displayPage(1);
            else
                displayPage(2);
            break;
        case 3: //time runs out. everyone loses
            console.log("tie");
            displayPage(3);
            break;
        }

    
    });
    //console.log("win = " + win);
   
        
}

function displayPage(num){
    console.log("displaying");
    var html, html2;
    switch(num){
        case 1:
            html = "<h1>You did it!!</h1><br>";
            break;
        case 2:
            html = "<h1>You did it!!</h1><br><br>";
            break;
        case 3:
            html = "<h1>Tie</h1><br>";
            break;
    }
    var winHTML = "<h1>You did it!!</h1><br>";
    var lob = ref.child("Lobby");
    lob.once("value", function(snapshot){
        console.log("snapshot thing");
        // var data = snapshot.val();
        // var html2 = "<table align='center'><tr><td></td><td><b>Player 1 Stats</b></td><td><b>Player 2 Stats</b></td></tr><tr><td>Clicks: </td><td><p>" + data.P1Clicks +"</p></td><td><p>" + data.P2Clicks + "</p></td></tr><tr><td>Time: </td><td><p>" + data.StartTimeP1 + "</p></td><td><p>" + data.StartTimeP2 + "</p></td><tr></table>";

        // console.log(" sdfkj " + html2);
        document.getElementById("wrapper").innerHTML = html;    // + html2; 
    });

    // lob.on("child_changed", function(snapshot) {
    //     var data = snapshot.val();
    //     var html2 = "<table align='center'><tr><td></td><td><b>Player 1 Stats</b></td><td><b>Player 2 Stats</b></td></tr><tr><td>Clicks: </td><td><p>" + data.P1Clicks +"</p></td><td><p>" + data.P2Clicks + "</p></td></tr><tr><td>Time: </td><td><p>" + data.StartTimeP1 + "</p></td><td><p>" + data.StartTimeP2 + "</p></td><tr></table>";
    //     document.getElementById("wrapper").innerHTML = html + html2;
    // });

    
    //document.getElementById("wrapper").innerHTML += 
}

