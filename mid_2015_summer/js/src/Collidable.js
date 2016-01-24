/*

*/

define([
	"src/Terrain",
	"src/Crect"
	], function(
		Terrain,
		Crect
		) {
		
	var Collidable = Terrain.extend({

		init : function(position, image_name){
			this._super(position, image_name);
			this.hit_box = new Crect(this.position, this.image.width, true);
        }

	});
	return Collidable;
});