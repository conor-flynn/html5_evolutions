/*
    - Currently and instance of an environment.

    - Attached to a player (drawn from the players position)
*/

define([
	"src/Vector2",
	"src/EnvironmentBlock",
	"src/EnvironmentBuilder",
	"src/Grid",
	"src/Raycast"
	], function(
		Vector2, 
		EnvironmentBlock,
		EnvironmentBuilder,
		Grid,
		Raycast
		){

	

	var Env = {};

	Env.load = function(){
		
		var name = "back";
		Env.background = content.get(name);

		// @Block = holds other blocks, or boxes
		// @Box   = a tile in the game

		Env.layers = 3;				// 2: array of blocks, array of blocks, array of tiles
		Env.blocks_per_block = 2;	// A x A blocks per block
		Env.tiles_per_block = 8;	// B x B boxes per lowest block

		EnvironmentBuilder.settings(
				Env.layers, 
				Env.blocks_per_block, 
				Env.tiles_per_block, 
				8);

		Env.game_width = EnvironmentBuilder.getBlockForLayer(Env.layers);
			// Debug environment boundaries
				Env.tl = new Vector2(0,0);
				Env.tr = new Vector2(Env.game_width, 0);
				Env.bl = new Vector2(0, Env.game_width);
				Env.br = new Vector2(Env.game_width, Env.game_width);


		Env.block = new EnvironmentBlock(
							Vector2.zero(), 
							Env.layers,
							Env.blocks_per_block,
							Env.tiles_per_block);

		Grid.settings(
				Env.layers, 
				Env.blocks_per_block, 
				Env.tiles_per_block, 
				8,
				Env.block);
	};

	Env.drawRayBoundary = function(ctx){
		Raycast.drawLine(Env.tl, Env.tr);
		Raycast.drawLine(Env.bl, Env.br);

		Raycast.drawLine(Env.tl, Env.bl);
		Raycast.drawLine(Env.tr, Env.br);
	};

	Env.draw = function(ctx, relPos){

		ctx.drawImage(Env.background, 0, 0, canvas.width, canvas.width);
		Env.block.draw(ctx, relPos, render_distance);
		Env.drawRayBoundary(ctx);

		// for (var i = 0; i < Env.blocks.length; i++) {
		// 	Env.blocks[i].draw(ctx, relPos, render_distance);
		// }
	};
	return Env;
});