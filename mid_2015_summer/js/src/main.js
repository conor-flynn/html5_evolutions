/*
	- { canvas, content, input } global handlers
	- Binds input
	- Loads images

	- Defines screen width/height 
	- Defines game width/height

	- Creates: var App = new GameSetup.extend({});


	- GameSetup.js
		- Once content is loaded, launch 'new GameRunner()'
	- GameRunner.js
*/

requirejs.config({

	baseUrl: "js",

	paths: {
		src: "./src"
	}
});


require([
	"src/GameSetup", 
	"src/GameRunner",
	"src/Vector2"
	], function(GameSetup, GameRunner, Vector2) {

	var App = GameSetup.extend({

		init: function() {

			// Debug variables
				this.display_fps = 0;
					// FPS is averaged over 'x' frames
				this.fps_group_num = 8;
					// Way 'x' frames after content is loaded before we start
				this.content_delay = this.fps_group_num + 2;

			canvas.width = 512;
			canvas.height = 512;
			canvas.scale = 1;

			// This distance is slightly longer than the screen's diagnol
			render_distance = Math.round(
								Math.sqrt(
									Math.pow(canvas.width,2) + 
									Math.pow(canvas.width,2))) + 10;
			//render_distance = 128;

			// All images that are used
			content.load("back", "res/back.png");
			content.load("player", "res/player.png");
			content.load("block", "res/block.png");

			input.bindKey("leftClick", input.Buttons.LEFT);
			input.bindKey("middleClick", input.Buttons.MIDDLE);
			input.bindKey("rightClick", input.Buttons.RIGHT);

			input.bindKey("space",  [input.Keys.SPACE]);
			input.bindKey("left",	[input.Keys.A]);
			input.bindKey("up", 	[input.Keys.W]);
			input.bindKey("right", 	[input.Keys.D]);
			input.bindKey("down", 	[input.Keys.S]);
			input.bindKey("f", 		[input.Keys.F]);

			this.hasLoad = false;
		},

		tick: function(delta) {

			if(this.hasLoad) {

				if(this.content_delay > 0){
					this.content_delay--;
					return;
				}else{
					this.runner.update(input, delta);
					this.runner.draw(canvas.ctx, delta);
				}
				
			}else{
				this.hasLoad = content.progress() === 1;
				if(this.hasLoad){
					this.runner = new GameRunner();
				}
			}
		}
	});


	(function() {
		var game = new App();
		game.run();

		window.onblur = game.stop.bind(game);
		window.onfocus = game.run.bind(game);
	})();
});