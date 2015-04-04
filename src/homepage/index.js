
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
        ref.createUser('email', 'password');
    });
});