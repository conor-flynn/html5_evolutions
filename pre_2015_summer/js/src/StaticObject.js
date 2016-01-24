

define(function(){

	var StaticObject = Class.extend({

		init: function(content_name, x_pos, y_pos){
			this.img = content.get(content_name);
			this.x = x_pos;
			this.y = y_pos;
		},

		draw: function(ctx, px, py){
			if(this.img){
				var draw_x = this.x - px;
				var draw_y = this.y - py;

				ctx.drawImage(this.img, draw_x, draw_y);
				//ctx.drawImage(this.img, this.x, this.y);
				
			}
		}
	});

	return StaticObject;
});