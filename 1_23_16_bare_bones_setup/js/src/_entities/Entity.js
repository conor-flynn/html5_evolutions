/*

*/

define([
	"src/_math/Vector2",
	"src/_rays/Raycast",
	"src/_structs/Poly"
	], function(
			Vector2,
			Raycast,
			Poly
			) {


	var Entity = Class.extend({

		init: function(spawnLocation){
			this.body = new Poly();

			
			//var num_points = Math.round(Math.random()*100 + 3);
			var num_points = 3 + Math.round(Math.random()*10);
			var total_angle = 0;
			var random_starting_angle = Math.round(Math.random()*90);

			this.body.addV(spawnLocation);

			for (var i = 0; i < num_points-1; i++) {
				var angle = 360.0 / num_points;
				var distance = 100 / num_points;
				var dir = Vector2.right();
				dir.amplify(distance);

				dir = Vector2.rotate(dir, (angle*i) + random_starting_angle);

				var point = Vector2.add(this.body.points[i], dir);
				this.body.addV(point);
			}
		},

		// input: the database for what bound buttons have been pressed or released
		// delta: the timestep since the last frame
		update: function(input, delta) {

		},

		// ctx is the canvas context. You draw stuff to it
			// ctx.drawImage( content.get("name"), start_x, start_y, end_x, end_y);	
		draw: function(ctx, delta) {
			this.body.draw(ctx);
		}

	});


	return Entity;
});