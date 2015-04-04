Firebase.enableLogging(true);

var ref = new Firebase('https://vivid-heat-3174.firebaseio.com');

// For index.html button submit
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

      console.log(emailPasswordObject);
      createUser(emailPasswordObject);
    });
  });

function createUser(emailPasswordObject)
{
  ref.createUser(emailPasswordObject, function(error, userData) {
    if (error) {
      switch (error.code) {
        case "EMAIL_TAKEN":
        console.log("The new user account cannot be created because the email is already in use.");
        authWithPassword(emailPasswordObject);
        break;
        case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        break;
        default:
        console.log("Error creating user:", error);
      }
    } else {  
      console.log("Successfully created user account with uid:", userData.uid);
      authWithPassword(emailPasswordObject);
    }
  });
}

function authWithPassword(emailPasswordObject)
{
  ref.authWithPassword(emailPasswordObject, function(error, authData) {
    if (error) {
     console.log("Login Failed!", error);
   } else {
    console.log("Authenticated successfully with payload:", authData);
    var html = '<p> you have logged in successfully </p>';
    document.getElementById("form").innerHTML= html;
    key = authData.uid;
    assignPlayerNumber(key);
  }
});
}

//////////////############# P1 AND P2 SHIT ############////////////////

function assignPlayerNumber(key) {
  var playersRef = ref.child("Lobby");
  var flag = false;

  ref.once("value", function(snapshot) {
    console.log("Printing out data object:");
    var data = snapshot.val();
    //console.log(data);
    if (data.Lobby.P1UID == "simplelogin:-1") {
      console.log("P1 is -1");
      playersRef.update({
        "P1UID": key
      });
      flag = true;
      var html = '<p>you are player 1</p>';
      document.getElementById("whichplayer").innerHTML = html;
    }
    else if ((data.Lobby.P2UID == "simplelogin:-1") && (flag == false)) {
      console.log("P2 is -1");
      playersRef.update({
        "lobbyFilled": true,
        "P2UID": key
      });
      var html = '<p>you are player 2</p>';
      document.getElementById("whichplayer").innerHTML = html;
    }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

/*ref.changePassword(emailOldNewPassWordObject, function(error) {
  if (error) {
    switch (error.code) {
      case "INVALID_PASSWORD":
        console.log("The specified user account password is incorrect.");
        break;
      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;
      default:
        console.log("Error changing password:", error);
    }
  } else {
    console.log("User password changed successfully!");
  }
});

ref.resetPassword(emailObject, function(error) {
  if (error) {
    switch (error.code) {
      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;
      default:
        console.log("Error resetting password:", error);
    }
  } else {
    console.log("Password reset email sent successfully!");
  }
});*/
