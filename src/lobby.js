var ref = new Firebase('https://vivid-heat-3174.firebaseio.com/Lobby');
Lobby.push(P1UID, P2UID); // makes the room 
var userid = "myuserid";
var reff = new Firebase('https://vivid-heat-3174.firebaseio.com/Lobby');
reff.transaction(function(Lobby){
	if(!Lobby.P1UID){
		Lobby.P1UID = userid;
		return Lobby;
	}
	else if(!Lobby.P2UID){
		Lobby.P2UID = userid;
		return Lobby;
	}
	return; // puts players in the room 
}, function(err, committed, snapshot){
	if(committed && !err){
		//joined room successfully and start game
	}
	else{
		// room is full make a new one
	}
}
