
// window.$ = window.jquery = require("jquery");

var ref = new Firebase("https://vivid-heat-3174.firebaseio.com");

ref.createUser(emailPassWordObject, function(error, userData) {
  if (error) {
    switch (error.code) {
      case "EMAIL_TAKEN":
        console.log("The new user account cannot be created because the email is already in use.");
        break;
      case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        break;
      default:
        console.log("Error creating user:", error);
    }
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});

ref.authWithPassword(emailPassWordObject, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});

ref.changePassword(emailOldNewPassWordObject, function(error) {
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
});