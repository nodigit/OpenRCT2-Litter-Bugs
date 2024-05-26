var currentMonth = date.month;
var incidents = 0;
pluginEnabled = false;

var litterTick = function() {
	if ((date.ticksElapsed % 40 === 0) && (pluginEnabled)){
	
		var allGuests = map.getAllEntities("guest");
		
		for (var i = 0; i < allGuests.length; i++) {
			var entity = allGuests[i];
			
				//Peeps will drop random items of trash
				if (Math.random()*100 < 1){
					var entityPos = {x: entity.x, y: entity.y};
					var guestsHere = map.getAllEntitiesOnTile("guest", entityPos);
					var newLitter = map.createEntity("litter", guestsHere[0]);
					newLitter.litterType = ["vomit_alt", "empty_can", "rubbish", "burger_box", "empty_cup", "empty_box", "empty_bottle", "empty_bowl_red", "empty_drink_carton", "empty_juice_cup", "empty_bowl_blue"][Math.floor(Math.random() * 11)];
					incidents++;
				}

				
		}
	}
}

var litterReport = function() {
	if (date.month !== currentMonth){

		//Alerts you if there's too many guests littering
		if (incidents >= (park.guests*0.5)+1){
			var msg = {type: "guests", text: incidents+" littering incidents occurred in your park last month. Consider adding more trash cans to your park."};
			park.postMessage(msg);
		}
		
		incidents = 0;
		currentMonth = date.month;
	}
}

var pluginState = function()
{
	pluginEnabled = !pluginEnabled;
	
	var msg = {type: "blank", text: "Litter Bugs enabled"};
	if (!pluginEnabled) {
		msg = {type: "blank", text: "Litter Bugs disabled"};
	}
	park.postMessage(msg);

}


var main = function() {
	
	context.subscribe("interval.day", litterReport);
	
	context.subscribe(
		"interval.tick",
		function() {
			litterTick();
		}
	);
	
	ui.registerMenuItem("Litter Bugs", pluginState);
	
};
registerPlugin({
	name: "Litter Bugs",
	version: "1.0",
	authors: ["nodigit"],
	type: "local",
	licence: "MIT",
	main: main
});