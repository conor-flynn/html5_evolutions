



define(["src/Player"], function (Player) {
	var GameRunner = Class.extend({

		
		init: function(){
			this.player = new Player();
		},

		update: function(input, delta) {
			this.player.update(input, delta);
		},

		draw: function(ctx) {
			this.player.draw(ctx);
		}
	});

	return GameRunner;
});
