/*
	Handles drawing of the game
*/


define([
	"src/Vector2"
	], function(
		Vector2)
		 {


	var Drawing = Class.extend({

		init: function(image, worldPos) {
			this.image = image;
			this.worldPos = worldPos;
			this.draw_x = 0;
			this.draw_y = 0;
		},
		convert: function(rel, width, height) {
			this.draw_x = (this.worldPos.x - rel.x) + width/2;
            this.draw_y = (this.worldPos.y - rel.y) + height/2;

            this.draw_x -= this.image.width/2;
            this.draw_y -= this.image.width/2;
		},
		draw: function(ctx, rel, width, height) {
			this.convert(rel, width, height);
			ctx.drawImage(this.image, this.draw_x, this.draw_y);
			return{
				lx : this.draw_x,
				ly : this.draw_y,
				rx : this.draw_x+this.image.width,
				ry : this.draw_y+this.image.height
			}
		}

	});

	var draw = {};

		// Base content
			draw.dark = [];

		// True content
			draw.light = [];
			draw.lightBlockers = [];

		// Sense layer
			draw.sense = [];

		// Enums
			draw.dark_layer = 0;
			draw.light_layer = 1;
			draw.both_layers = 2;
			draw.sense_layer = 3;

		// Screen
			draw.w = 0;
			draw.h = 0;

		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

		draw.load = function() {

			draw.w = canvas.width;
			draw.h = canvas.height;

			// draw.dark_view = document.createElement("canvas");
			// draw.dark_view.width  = draw.w;
			// draw.dark_view.height = draw.h;
			// draw.dark_ctx = draw.dark_view.getContext("2d");

			draw.light_view = document.createElement("canvas");
			draw.light_view.width  = draw.w;
			draw.light_view.height = draw.h;
			draw.light_ctx = draw.light_view.getContext("2d");
				draw.light_lx = 0;
				draw.light_rx = 0;
				draw.light_ly = 0;
				draw.light_ry = 0;

			draw.sense_view = document.createElement("canvas");
			draw.sense_view.width  = draw.w;
			draw.sense_view.height = draw.h;
			draw.sense_ctx = draw.sense_view.getContext("2d");
		};

		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
		
		draw.addDark = function(image, worldPos) {
			draw.dark.push(new Drawing(image, worldPos));
		};

		draw.addLight = function(image, worldPos) {
			draw.light.push(new Drawing(image, worldPos));
		};

		draw.addSense = function(image, worldPos) {
			draw.sense.push(new Drawing(image, worldPos));
		};
		
		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
		
		draw.addLightBlocker = function(polygon) {
			draw.lightBlockers.push(polygon);
		};

		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

		draw.drawDark = function(rel) {
			var arr = draw.dark;
			for (var i = 0; i < arr.length; i++) {
				arr[i].draw(canvas.ctx, rel, draw.w, draw.h);
			}
			draw.dark = [];
		};

		draw.drawLight = function(rel) {

			//Clear affected region
			/*draw.light_ctx.clearRect(
				draw.light_lx, 
				draw.light_ly, 
				draw.light_rx, 
				draw.light_ry);*/

			draw.light_ctx.clearRect(
				0, 
				0, 
				draw.w, 
				draw.h);

			// Reset affected region dimensions
			draw.light_lx = draw.w; 
			draw.light_ly = draw.h; 
			draw.light_rx = 0; 
			draw.light_ry = 0;

			draw.light_ctx.globalCompositeOperation = "source-over";

			for (var i = 0; i < draw.lightBlockers.length; i++) {
				var a = draw.lightBlockers[i].draw(draw.light_ctx, rel, draw.w, draw.h);


				draw.light_lx = (a.lx < draw.light_lx) ? a.lx : draw.light_lx;
				draw.light_ly = (a.ly < draw.light_ly) ? a.ly : draw.light_ly; 
				draw.light_rx = (a.rx > draw.light_rx) ? a.rx : draw.light_rx;
				draw.light_ry = (a.ry > draw.light_ry) ? a.ry : draw.light_ry;
			}


			draw.light_ctx.globalCompositeOperation = "source-atop";
			// Draw & calculate affected region dimensions
			var arr = draw.light;
			for (var i = 0; i < arr.length; i++) {
				var res = arr[i].draw(draw.light_ctx, rel, draw.w, draw.h, draw.light_layer);

				draw.light_lx = (res.lx < draw.light_lx) ? res.lx : draw.light_lx;
				draw.light_ly = (res.ly < draw.light_ly) ? res.ly : draw.light_ly; 
				draw.light_rx = (res.rx > draw.light_rx) ? res.rx : draw.light_rx;
				draw.light_ry = (res.ry > draw.light_ry) ? res.ry : draw.light_ry;
			}
			// console.log("x: " + draw.light_lx + "  " + draw.light_rx);
			// console.log("y: " + draw.light_ly + "  " + draw.light_ry);			

			// Remove all drawings
			draw.lightBlockers = [];
			draw.light = [];
		};

		draw.drawSense = function(rel) {
			draw.sense_ctx.clearRect(0, 0, draw.w, draw.h);
			draw.sense_ctx.globalCompositeOperation = "destination-in";
			draw.sense_ctx.fillStyle = "rgba(0,0,0,0)";
			draw.sense_ctx.fillRect(0,0, draw.w, draw.h);

			var arr = draw.sense;
			for (var i = 0; i < arr.length; i++) {
				arr[i].draw(draw.sense_ctx, rel, draw.w, draw.h);
			}
			draw.sense = [];			
		};

		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

		draw.writeLight = function() {
			draw.light_lx = Math.floor(draw.light_lx);
			draw.light_rx = Math.ceil(draw.light_rx);
			draw.light_ly = Math.floor(draw.light_ly);
			draw.light_ry = Math.ceil(draw.light_ry);

			var light_width = draw.light_rx - draw.light_lx;
			var light_height = draw.light_ry - draw.light_ly;

			var ctx = canvas.ctx;
			var base = ctx.getImageData(0, 0, draw.w, draw.h);

			var _light = draw.light_ctx.getImageData(
							draw.light_lx, 
							draw.light_ly,
							light_width, 
							light_height);
			//var _sense = draw.sense_ctx.getImageData(0, 0, draw.w, draw.h);

			var main_data  = base.data;
			var light_data = _light.data;

			var new_index = 0;

			//console.log(light_height + "," + light_width);

			
			for (var row = 0; row < light_height; row++) {

				for (var col = 0; col < light_width; col++) {

					var light_index = col*4 + (4*row*light_width);
						var cc = (draw.light_lx*4)+(col*4);
						var rr = (draw.light_ly*draw.w*4) + (4*row*draw.w);
					var main_index = cc + rr;

						// main_data[main_index]   = light_data[light_index];
						// main_data[main_index+1] = light_data[light_index+1];
						// main_data[main_index+2] = light_data[light_index+2];
						// main_data[main_index+3] = light_data[light_index+3];


					if (light_data[light_index+3] == 0){
						continue;
					}else{
						main_data[main_index]   = light_data[light_index];
						main_data[main_index+1] = light_data[light_index+1];
						main_data[main_index+2] = light_data[light_index+2];
						main_data[main_index+3] = light_data[light_index+3];
					}
				}
			}
			base.data = main_data;
			ctx.putImageData(base, 0, 0);

		};

		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
		//=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~

		draw.draw = function(rel){
			// draw dark and put that data to THE canvas
				draw.drawDark(rel);
			// draw light and put that data to THE canvas
				draw.drawLight(rel);
			// draw sense and put that data to THE canvas
				draw.drawSense(rel);


			// Write resulting canvas's to the main screen
				draw.writeLight();
		};

	return draw;
});