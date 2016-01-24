/*

*/

define([
	"src/Grid",
	"src/TextInfo",
	"src/Color"
	], function(
		Grid,
		TextInfo,
		Color
		) {

	var me = {};
	var pool = [];

	me.drawText = function(id, info, pos, color, stable){
		var text = new TextInfo(id, info, pos, color, stable);
		pool.push(text);
	};

	me.draw = function(ctx, relPos, delta){
		var overflow =  [];
		for (var i = 0; i < pool.length; i++) {

			var location = Grid.convertWorldToScreen(pool[i].location, relPos);
			var color = Color.default;
				switch (pool[i].color) {
					case "red":
						color = Color.red;
					break;
					case "green":
						color = Color.green;
					break;
					case "blue":
						color = Color.blue;
					break;
					case "black":
						color = Color.black;
					break;
					case "yellow":
						color = Color.yellow;
					break;
				}
			ctx.fillStyle = color;
			ctx.font = "18px Calibri";
			ctx.fillText(pool[i].info, location.x, location.y);

			var stable = pool[i].stable;
				if(typeof stable === 'boolean' && stable){
					overflow.push(pool[i]);
				}else if(typeof stable === 'number' && stable > 0){
					pool[i].stable -= delta;
					overflow.push(pool[i]);
				}
		};
		pool = overflow;
	};


	return me;
});