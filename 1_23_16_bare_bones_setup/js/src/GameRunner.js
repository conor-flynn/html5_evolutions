



define([
	"src/_rays/Raycast",
	"src/_math/Vector2",
	"src/_entities/Entity"
	], function (
		Raycast,
		Vector2,
		Entity
		) {

	var people = [];

	var GameRunner = Class.extend({

		
		
		init: function(){

			var x_min = 50;
			var y_min = 50;
			var x_max = 450;
			var y_max = 450;

			for (var i = 0; i < 30; i++){
				var x = Math.random()*(x_max-x_min) + x_min;
				var y = Math.random()*(y_max-y_min) + y_min;
				people.push(new Entity(new Vector2(x,y)));
			}
		},

		// input: the database for what bound buttons have been pressed or released
		// delta: the timestep since the last frame
		update: function(input, delta) {
			Raycast.drawLine(new Vector2(0,0), new Vector2(512,512), "red");
			Raycast.drawLine(new Vector2(0,256), new Vector2(512, 0), "green");
		},

		// ctx is the canvas context. You draw stuff to it
			// ctx.drawImage( content.get("name"), start_x, start_y, end_x, end_y);	
		draw: function(ctx, delta) {

			ctx.drawImage(content.get("back"),0,0,v_width,v_height);	// Draws the grey background

			for (var i = 0; i < people.length; i++) {
				people[i].draw(ctx);
			}

			// Draws all rays created by Raycast.drawLine()
			Raycast.draw(ctx, new Vector2(256,256), delta);
		}
	});

	return GameRunner;
});
