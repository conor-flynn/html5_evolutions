/*

*/

define([
	"src/_math/Vector2",
	"src/_rays/Raycast"
	], function(
			Vector2,
			Raycast
			) {

	var Poly = Class.extend({

		init: function(points){
			this.points = [];
			if(points !== undefined){
				this.points = points;
			}
		},

		addP: function(x,y){
			this.points.push(new Vector2(x,y));
		},

		addV: function(vect){
			this.points.push(vect);
		},

		draw: function(ctx){

			var lx = 0;
			var ly = 0;
			var rx = 0;
			var ry = 0;

			ctx.fillStyle = '#000000';

			ctx.beginPath();
			for (var i = 0; i < this.points.length; i++) {
				var thing = this.points[i].mimic();

				lx = (thing.x < lx) ? thing.x : lx;
				rx = (thing.x > rx) ? thing.x : rx;
				ly = (thing.y < ly) ? thing.y : ly;

				ry = (thing.y > ry) ? thing.y : ry;

				if (i == 0) {
					ctx.moveTo(thing.x, thing.y);
				} else {
					ctx.lineTo(thing.x, thing.y);
				}
			}
			ctx.closePath();
			ctx.fill();

			return{
				lx : lx,
				rx : rx,

				ly : ly,
				ry : ry
			}
		}

		// debug: function(){
		// 	for (var i = 0; i < this.points.length-1; i++) {
		// 		Raycast.drawLine(this.points[i], this.points[i+1]);
		// 	}
		// 	Raycast.drawLine(this.points[i], this.points[0]);
		// }

	});
	return Poly;
});