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

		toString: function(toLog){
			var result = "";
			result += "Wall" + " : " + this._super(false);
			if(toLog) console.log(result);
			return result;
		}

	});
	return Wall;
});