// window.$ = window.jquery = require("jquery");
$('body').prepend('<canvas id="canvas"></canvas>');

Firebase.enableLogging(true);
var f = new Firebase('https://vivid-heat-3174.firebaseio.com/');
var fc = f.child('clicks');
fc.transaction(function(curr) {
  if (isNaN(parseFloat(curr)))
    return 1; // initialize to 1.
  else
    return curr + 1; // increment.
}, function() {
    // Once the transaction has completed, update the UI (and watch for updates).
    fc.on('value', function(s) {
      document.getElementById('contents').innerHTML = s.val();
    });
  });


function showInitMenu() {

}

function showLogin() {

}

function displayWarning() {

}

function loadGame() {

}

function endGame() {
	
}