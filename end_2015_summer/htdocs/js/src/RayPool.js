/*

*/

define([
	"src/Ray",
	"src/Vector2",
	"src/Color",
	"src/Grid"
	], function(
		Ray,
		Vector2,
		Color,
		Grid
		) {

	var here = {};
	var pool = [];

	// Draw all of the rays that exist in the pool relative to '@rel'
	here.draw = function(ctx, rel, delta){
		var overFlow = [];
		for (var i = 0; i < pool.length; i++) {
			
			var result = here.convertRayToScreen(pool[i], rel);

			var start = result.start;
			var end   = result.end;
			var color = Color.default;


			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
				switch (pool[i].color) {
					case "red":
						color = Color.red;
					break;
					case "green":
						color = Color.green;
					break;
					case "blue":
						color = Color.blue;
					break;
					case "black":
						color = Color.black;
					break;
					case "yellow":
						color = Color.yellow;
					break;
				}
			ctx.strokeStyle = color;
			ctx.stroke();

			pool[i].time -= delta;
			if(pool[i].time > 0) overFlow.push(pool[i]);
		};
		
		pool = [];
		pool = overFlow;
	};

	// Add '@ray' to 'pool'
	here.add = function(ray){
		pool.push(ray);
	};

	// Converts '@ray' data to screen data so that drawing can take place
	here.convertRayToScreen = function(ray, rel){

		var start = new Vector2();
		var end   = new Vector2();

		if(ray.isLine){

			start = Grid.convertWorldToScreen(ray.start, rel);
			end   = Grid.convertWorldToScreen(ray.end,   rel);

		}else if(ray.isRay){

			//var direction = ray.dir.getNorm();
			var direction = ray.dir;
				//direction = Vector2.multiply(direction, canvas.width);
				var preEnd = Vector2.add(ray.start, direction);

			start = Grid.convertWorldToScreen(ray.start, rel);
			end   = Grid.convertWorldToScreen(preEnd,    rel);
			
		}else{
			console.log("bad ray data");
		}


		return{
			start : start,
			end   : end
		}
	};

	return here;
});
