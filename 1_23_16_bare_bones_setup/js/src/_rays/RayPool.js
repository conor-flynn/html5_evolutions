/*

*/

define([
	"src/_rays/Ray",
	"src/_math/Vector2",
	"src/_rays/Color"
	], function(
		Ray,
		Vector2,
		Color
		) {

	var RayPool = {};
	var pool = [];


	// Add '@ray' to 'pool'
	RayPool.add = function(ray){
		pool.push(ray);
	};

	// Converts '@ray' data to screen data so that drawing can take place
	RayPool.convertRayToScreen = function(ray, rel){

		var start = new Vector2();
		var end   = new Vector2();

		// if(ray.isLine){

		// 	start = Grid.convertWorldToScreen(ray.start, rel);
		// 	end   = Grid.convertWorldToScreen(ray.end,   rel);

		// }else if(ray.isRay){

		// 	//var direction = ray.dir.getNorm();
		// 	var direction = ray.dir;
		// 		//direction = Vector2.multiply(direction, canvas.width);
		// 		var preEnd = Vector2.add(ray.start, direction);

		// 	start = Grid.convertWorldToScreen(ray.start, rel);
		// 	end   = Grid.convertWorldToScreen(preEnd,    rel);
			
		// }else{
		// 	console.log("bad ray data");
		// }


		return{
			start : ray.start,
			end   : ray.end
		}
	};

	return RayPool;
});
