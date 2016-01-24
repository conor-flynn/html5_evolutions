/*
    - Created from `main.js` after content is laoded

    - Runs the app
*/



define([
	"src/Player",
	"src/Environment",
	"src/Raycast",
	"src/RayPool",
	"src/Vector2",
	"src/Draw",
	"src/NPCs"
	], function (
		Player,
		Environment,
		Raycast,
		RayPool,
		Vector2,
		Draw,
		NPCs,
		Grid
		) {
	var GameRunner = Class.extend({

		/*
			init called after the game is ready to be run (all engine created: all input bound, content loaded)
		*/
		init: function(){

			// Initializing the data for the Environment
			//Environment.load();
			NPCs.load();
			Draw.load();
			this.player = new Player();
		},

		update: function(input, delta) {
			//NPCs.update(delta);
			this.player.update(input, delta);
		},

		draw: function(ctx, delta) {
			Draw.addDark (content.get("test_dark"),  new Vector2(384,384));
			Draw.addLight(content.get("test_light"), new Vector2(384,384));
			//Environment.draw(this.player.getLoc(), render_distance);
			NPCs.draw(this.player.location);
			this.player.draw();
			Draw.draw(this.player.location);

			Raycast.draw(ctx, this.player.location, delta);    // Draw all rays
           	//Text.draw(ctx, this.player.getLoc(), delta);       // Draw all text
		}
		
	});
	return GameRunner;
});
