//---------------------Listeners-----------------------
document.addEventListener('DOMContentLoaded', function() {
  var thebutton = document.getElementById('signup');

    // onClick's logic below:
    thebutton.addEventListener('click', function() {
      var emailInput = document.getElementById("email").value;
      var pwInput = document.getElementById("password").value;

      createUser({email: emailInput, password: pwInput});
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    var resetButton = document.getElementById('reset');
    // onClick's logic below:
    resetButton.addEventListener('click', function() {

    var resetRef = new Firebase('https://vivid-heat-3174.firebaseio.com/Lobby');
    resetRef.update( {
      P1UID: 'simplelogin:-1',
      P2UID: 'simplelogin:-1',
      lobbyFilled: false,
      StartTimeP1: 0,
      StartTimeP2: 0
    });
  });
});


//----------------------Functions---------------------------


var playerNum = 1;
var sec = 59;
var min = 2;

function assignPlayerNumber(key) {
  var playersRef = ref.child("Lobby");
  var alreadyFilled = false;

  ref.once("value", function(snapshot) {
    console.log("Printing out data object:");
    var data = snapshot.val();
    //console.log(data);
    if (data.Lobby.P1UID == "simplelogin:-1") {
      console.log("P1 is -1");
      playersRef.update({
        "P1UID": key,
        "BeginPage": Player.randomURL
      });
      flag = true;
      Player.UID = key;
      var html = '<p>You are Player 1.</p> <br> <p>Please wait as we find you a Player 2.</p>';
      document.getElementById("whichplayer").innerHTML = html;
    }
    else if ((data.Lobby.P2UID == "simplelogin:-1") && (data.Lobby.P1UID != key) && (alreadyFilled == false)) {
      console.log("P2 is -1");
      playersRef.update({
        "lobbyFilled": true,
        "P2UID": key,
        "EndPage": Player.randomURL
      });
      var html = '<p>You are Player 2</p>';
      Player.UID = key;
      document.getElementById("whichplayer").innerHTML = html;
      playerNum = 2;
    }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

//reference to the things we watch
var ref2 = new Firebase("https://vivid-heat-3174.firebaseio.com/Lobby/lobbyFilled");

//get data on a post that has changed
ref2.on("value", function(snapshot) {
  var changedPost = snapshot.val();
  // console.log("Changedpost is:" + changedPost);
  if (changedPost == true) {
    gameTransition();
  }
});


function gameTransition() {
  var html = "<p>A Match has been made!</p>";
  document.getElementById("whichplayer").innerHTML = html;

  var count = 5;

  var run = setInterval(timer, 1000);
  function timer(){
    if(count >= 0)
    {
      var countHTML = "Game begins in " + count + " seconds";
      document.getElementById("counter").innerHTML = countHTML;
    }
    count--;

    if (count == -1) {
      document.getElementById("counter").innerHTML = "";
      clearInterval(run);

      document.getElementById("")
      document.getElementById("loginform").innerHTML = "";
 
      var run = setInterval(timer, 1000);
      function timer() { 
      document.getElementById("timer").innerHTML = 'You have ' + min + ' minutes and ' + sec +  ' seconds remaining.';
      console.log("timer in");
      sec--;
      if (sec == 0) {
        if (min == 0) {
            document.getElementById("timer").innerHTML = 'Game over!';
            clearInterval(run);
          }
        min--;
        sec = 59;
      }
    }
      document.getElementById("wrapper").innerHTML += "<iframe src='about:blank' width='80%' height='800px' id='gameFrame'></iframe>";
      login();
    } 
  }
}

//function 

