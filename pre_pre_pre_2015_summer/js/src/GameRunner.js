



//define(["src/Player"], function (Player) {
define([], function () {
	var GameRunner = Class.extend({

		
		init: function(){

		},

		// input: the database for what bound buttons have been pressed or released
		// delta: the timestep since the last frame
		update: function(input, delta) {
			console.log("Elapsed time: " + delta);
		},

		// ctx is the canvas context. You draw stuff to it
			// ctx.drawImage( content.get("name"), start_x, start_y, end_x, end_y);	
		draw: function(ctx) {
			ctx.drawImage(content.get("back"),0,0,v_width,v_height);
		}
	});

	return GameRunner;
});
