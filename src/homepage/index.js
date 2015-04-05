document.addEventListener('DOMContentLoaded', function() {
  var thebutton = document.getElementById('signup');

    // onClick's logic below:
    thebutton.addEventListener('click', function() {
      var emailInput = document.getElementById("email").value;
      var pwInput = document.getElementById("password").value;

      var emailPasswordObject = { 
        email: emailInput,
        password: pwInput
      };

      createUser(emailPasswordObject);
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
      StartTimeP1: -54,
      StartTimeP2: -55
    });
  });
});
