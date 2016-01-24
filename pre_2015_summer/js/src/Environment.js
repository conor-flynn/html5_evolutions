
define(["src/StaticObject"], function(StaticObject){

	var Environment = Class.extend({

		init: function(){

			this.back = content.get("back");

			var size = 64;
			this.blocks = [];

			var offset = 0;	// The environment is 'size' wide, offset reduces this

			for(var x = offset; x < size-offset; x++){
				for(var y = offset; y < size-offset; y++){
					if(Math.random() > .5){
						var temp = new StaticObject("block", x*8, y*8);
						this.blocks.push(temp);
					}
				}
			}
		},

		draw: function(ctx, playerx, playery){
			ctx.drawImage(this.back,0,0,v_width*1.5,v_height*1.5);
			for(var i = 0; i < this.blocks.length; i++){
				this.blocks[i].draw(ctx, playerx, playery);
			}
		}
		
	});

	return Environment;
});