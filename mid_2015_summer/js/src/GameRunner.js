/*
    - Created from `main.js` after content is laoded

    - Runs the app
*/



define([
	"src/Player",
	"src/Environment",
	"src/Raycast",
	"src/RayPool",
	"src/Vector2"
	], function (
		Player,
		Environment,
		Raycast,
		RayPool,
		Vector2
		) {
	var GameRunner = Class.extend({

		/*
			init called after the game is ready to be run (all engine created: all input bound, content loaded)
		*/
		init: function(){

			// Initializing the data for the Environment
			Environment.load();
			Environment.draw(canvas.ctx, new Vector2(canvas.width/2, canvas.width/2));
			this.player = new Player();
		},

		update: function(input, delta) {
			this.player.update(input, delta);
		},

		draw: function(ctx, delta) {
			this.player.draw(ctx, delta);
		}
		
	});
	return GameRunner;
});
