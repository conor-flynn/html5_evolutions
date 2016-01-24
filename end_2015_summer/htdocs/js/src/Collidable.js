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

		init : function(location, image_name, type){
			this._super(location, image_name, type);
			this.hit_box = new Crect(this.location, this.getImage().width, true);
        }

	});
	return Collidable;
});