function function_name(argument) {
	// body...
}


var testharvester = {

	createMaxBody: function(rooms) {
		for (const [room, data] of Object.entries(rooms)) {
  			console.log(`${room}: ${data}`);
  			console.log(data.energyCapacityAvailable)
		}
		//for(const name in rooms) {
		//	console.log(JSON.stringify(name, null, 4))
		//console.log("a")
		//console.log(JSON.stringify(Game.rooms, null, 2))
		//};
	}

	

}

module.exports = { testharvester };