Firebase.enableLogging(true);

var ref = new Firebase('https://vivid-heat-3174.firebaseio.com');
var lobby = ref.child("Lobby");
var min = 3;

var gameover = 0;

//countdownTimer(min);
function loadGame(){
	//start timer
	
	countdownTimer(min);
}

function destReached(){ //bool

}

function findWinner(){

}

function countdownTimer(minutes){
	var secs = 60;
	var mins = minutes;
	function tick(){
		var counter = document.getElementById("countdown");
		var current = mins-1;
		secs--;
		counter.innerHTML = current.toString()+":" + (secs < 10 ? "0":"")+ String(secs);
		if(secs > 0){
			setTimeout(tick, 1000);
		}
		else{
			if(mins > 1)
				setTimeout(function(){ countdownTimer(mins-1);}, 1000);
		}
	}

	tick();
	if(mins == 0 && secs == 0){
		gameover = 1;

		//var html = <p>Game Over</p>;
	}
}

