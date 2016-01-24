/*
    
*/
define(function(){

	var _vendors = ["o", "ms", "moz", "webkit"];

	for(var i = _vendors.length; i-- && !window.requestAnimationFrame;) {
		var v = _vendors[i];

		window.requestAnimationFrame = window[v + "RequestAnimationFrame"];
		window.cancelAnimationFrame  = window[v + "CancelAnimationFrame"] ||
									   window[v + "CancelRequestAnimationFrame"];
	}

	var GameSetup = Class.extend({

		tick: function(delta) {
			console.warn("should override this function within the child");
		},

		stop: function() {
			if(this._reqframe) {
				window.cancelAnimationFrame(this._reqframe);
			}
			this._reqframe = null;
			this._running = false;
		},

		
		run: function() {

			if(this._running) return;

			var self = this;
			var time;
			var data = [];
			function loop() {
				self._reqframe = window.requestAnimationFrame(loop);

				var now = new Date().getTime();
				var delta = now - (time || now);

				if(self.display_fps){
					data.unshift(delta);
					if(data.length > self.fps_group_num) data.pop();
				}
				time = now;

				// ~Program
				self.tick(delta/1000.0);
				input.clearPressed();
				canvas.flip();
				// ~Program

				if(self.display_fps){
					var sum = 0;
					for(var i = 0; i < data.length; i++){
						sum += data[i];
					}
					sum /= data.length;
					console.log("Average frame rate : " + Math.round(1000 / sum));
				}
			}
			this._reqframe = window.requestAnimationFrame(loop);
		}
	});

	return GameSetup;
});