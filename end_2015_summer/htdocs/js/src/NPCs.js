/*

*/

define([
	"src/Vector2",
	"src/DynamicEntity",
	"src/Wall"
	], function(
			Vector2,
			DynamicEntity,
			Wall
			) {

	var npcs = {};
	//=================================================================
		npcs.people = [];

		npcs.load = function() {
			var enemy = new DynamicEntity(new Vector2(100,100), "enemy", 1);
			npcs.people.push(enemy);
		};

		npcs.update = function(delta) {
			for (var i = 0; i < npcs.people.length; i++) {
				npcs.people[i].update(delta);
			}
		};

		npcs.draw = function(rel) {
			for (var i = 0; i < npcs.people.length; i++) {
				npcs.people[i].draw(rel, render_distance);
			}
		};
	//=================================================================
	return npcs;
});