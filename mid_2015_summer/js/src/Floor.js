/*

*/

define([
	"src/Walkable"
	], function(
		Walkable
		) {

	var Floor = Walkable.extend({

		toString: function(toLog){
			var result = "Floor :" + this._super(false);
			if(toLog) console.log(result);
			return result;
		}
		
	});
	return Floor;
});