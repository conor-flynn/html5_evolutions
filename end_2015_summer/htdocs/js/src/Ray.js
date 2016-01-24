/*

*/

define([
	"src/Vector2"
	], function(
		Vector2
		) {

	var Ray = Class.extend({

		init: function(){
			this.start  = new Vector2();
			this.end    = new Vector2();
			this.dir    = new Vector2();
			this.isLine = false;
			this.isRay  = false;
			this.time = 0;
		},

		toString: function(toLog){
			var result = "Ray : ";
			result += this.start.toString() + ", ";
			if(this.isLine){
				result += "isLine : " + this.end.toString();
			}else if(this.isRay){
				result += "isRay  : " + this.dir.toString();
			}
			if(toLog) console.log(result);
			return result;
		}	

	});

	return Ray;
});