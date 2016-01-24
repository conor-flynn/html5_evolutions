/*

*/

define([
	"src/Vector2",
	"src/Raycast"
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

		addPoint: function(vect){
			this.points.push(vect);
		},

		draw: function(ctx, rel, width, height){

			var lx = width;
			var ly = height;
			var rx = 0;
			var ry = 0;

			width += 16;
			height += 16;

			ctx.fillStyle = '#000000';
			//ctx.fillStyle = '#ffffff';

			// if (this.start !== undefined && this.end !== undefined) {
			// 	var grd = ctx.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);
			// 	grd.addColorStop(1, 'rgba(0,0,0,0');
			// 	grd.addColorStop(0, 'rgba(255,255,255,1');
			// 	ctx.fillStyle = grd;
			// }

			ctx.beginPath();
			for (var i = 0; i < this.points.length; i++) {
				var thing = this.points[i].mimic();
					thing.x = (thing.x - rel.x) + width/2;
					thing.y = (thing.y - rel.y) + height/2;

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


			// ctx.beginPath();
			// //ctx.arc(260, 260, 50, 0, 2*Math.PI, false);
			// ctx.rect(256,256, 36, 36);
			// ctx.fillStyle = '#000000';
			// ctx.fill();

			return{
				lx : lx,
				rx : rx,

				ly : ly,
				ry : ry
			}
		},

		debug: function(){
			for (var i = 0; i < this.points.length-1; i++) {
				Raycast.drawLine(this.points[i], this.points[i+1]);
			}
			Raycast.drawLine(this.points[i], this.points[0]);
		}

	});
	return Poly;
});