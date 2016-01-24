


define(["src/Environment"], function (Environment) {
	var Player = Class.extend({

		init: function(){
			this.base_image = content.get("player");


			// The player currently spawns in the center of the screen.
			this.true_x = v_width/2;	
			this.true_y = v_height/2;

			this.visual_x = 0;
			this.visual_y = 0;

			this.lock_x = 0;
			this.lock_y = 0;

			this.env = new Environment();
		},

		update: function(input, delta) {

			var speed = Math.round(2*delta);

			//this.x = 0;
			//this.y = 0;
			if(input.down("left")){
				this.true_x -= speed;
			}
			if(input.down("right")){
				this.true_x += speed;
			}
			if(input.down("up")){
				this.true_y -= speed;
			}
			if(input.down("down")){
				this.true_y += speed;
			}
			
			if(this.true_x < 0) this.true_x = 0;
			if(this.true_x > g_width) this.true_x = g_width;

			if(this.true_y < 0) this.true_y = 0;
			if(this.true_y > g_height) this.true_y = g_height;
		},

		draw: function(ctx) {

			var v_x, v_y;

			this.visual_x = v_width/2;
			this.visual_y = v_height/2;


			this.visual_x -= this.base_image.width/2;
			this.visual_y -= this.base_image.height/2;

			this.env.draw(ctx, this.true_x-(v_width/2), this.true_y-(v_height/2));

			ctx.drawImage(this.base_image, this.visual_x, this.visual_y);

			console.log("Position: " + this.true_x + "," + this.true_y);
		}
	});

	return Player;
});
