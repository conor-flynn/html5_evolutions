/*

*/

define([
	"src/Collidable",
	"src/Crect"
	], function(
		Collidable,
		Crect
		) {

	var Wall = Collidable.extend({

		init: function(position, image_name){
			this._super(position, image_name);
			this.hitbox = new Crect(position, this.image.width, true);
		},

		toString: function(toLog){
			var result = "";
			result += "Wall" + " : " + this._super(false);
			if(toLog) console.log(result);
			return result;
		}

	});
	return Wall;
});