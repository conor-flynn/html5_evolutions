



//define(["src/Player"], function (Player) {
define(["src/Environment"], function (Environment) {
	var GameRunner = Class.extend({

		
		init: function(){
			this.env = new Environment();	// Environment starts at position (0,0) currently
		},

		// input: the database for what bound buttons have been pressed or released
		// delta: the timestep since the last frame
		update: function(input, delta) {
			console.log("Elapsed time: " + delta);
		},

		// ctx is the canvas context. You draw stuff to it
			// ctx.drawImage( image_object, start_x, start_y, end_x, end_y);	
		draw: function(ctx) {

			// The environment is drawn relative to something.
				// Currently drawn as if the player is in the center of the screen
			this.env.draw(ctx, v_width/2, v_height/2);
		}
	});

	return GameRunner;
});
