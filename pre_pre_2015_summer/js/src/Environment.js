
define(["src/StaticObject"], function(StaticObject){

	var Environment = Class.extend({

		init: function(){

			this.back = content.get("back");

			var size = 64;
			this.blocks = [];

			var offset = 0;	// The environment is 'size' wide, offset reduces this
							// If this value isn't zero, the environment doesn't fill to the edge

			for(var x = offset; x < size-offset; x++){
				for(var y = offset; y < size-offset; y++){

					// Currently there is no 'floor' there is just a lack of walls that create empty space
					if(Math.random() > .5){
						var temp = new StaticObject("block", x*8, y*8);
						this.blocks.push(temp);
					}
				}
			}
		},

		// playerx/y : draws the environment relative those positions.
			// if playerx is increasing, the environment will shifted left (decreasing)
		draw: function(ctx, playerx, playery){

				// Since the 'player' is drawn in the center of the screen, we have to offset
			playerx -= v_width/2;
			playery -= v_height/2;

			// Draws 'this.back' which just gives color to the background canvas
			ctx.drawImage(this.back,0,0,v_width*1.5,v_height*1.5);	

			// Draws all the blocks
			for(var i = 0; i < this.blocks.length; i++){
				this.blocks[i].draw(ctx, playerx, playery);
			}
		}
		
	});

	return Environment;
});