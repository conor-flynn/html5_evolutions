
requirejs.config({

	baseUrl: "js",

	paths: {
		src: "./src"
	}
});


require(["src/GameCore", "src/GameRunner"], function(GameCore, GameRunner) {

	var App = GameCore.extend({

		init: function() {

			// Global values
			v_width 	= 512;
			v_height 	= 512;

			//This distance is slightly longer than the screen's diagnol
			// So when you have terrain, you can check to see if it is 
				// within 'render distance' before you draw it
			render_distance = Math.round(Math.sqrt(Math.pow(v_width,2) + Math.pow(v_height,2))) + 10;

			canvas.width = v_width;
			canvas.height = v_height;
			canvas.scale = 1;

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

			this.hasLoad = false;
		},

		tick: function(delta) {

			if(this.hasLoad) {
				this.runner.update(input, delta);
				this.runner.draw(canvas.ctx, delta);
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

		window.onblur = game.stop.bind(game);	// This freezes the game when the player clicks out of the canvas
		
		window.onfocus = game.run.bind(game);
	})();
});