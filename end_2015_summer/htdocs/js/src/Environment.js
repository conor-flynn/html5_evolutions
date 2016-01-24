/*
    - Currently and instance of an environment.

    - Attached to a player (drawn from the players location)
*/

define([
	"src/Vector2",
	"src/EnvironmentBlock",
	"src/EnvironmentBuilder",
	"src/Grid",
	"src/Raycast",
	"src/Draw"
	], function(
		Vector2, 
		EnvironmentBlock,
		EnvironmentBuilder,
		Grid,
		Raycast,
		Draw
		){

	

	var Env = {};

	Env.load = function(){
		
		Env.background = content.get("back");

		// @Block = holds other blocks, or boxes
		// @Box   = a tile in the game

		// Env.layers = 3;				// 2: array of blocks, array of blocks, array of tiles
		// Env.blocks_per_block = 2;	// A x A blocks per block
		// Env.tiles_per_block = 8;	// B x B boxes per lowest block

		Env.layers = 1;
		Env.blocks_per_block = 1;
		Env.tiles_per_block = 1;

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

	Env.drawRayBoundary = function(){
		Raycast.drawLine(Env.tl, Env.tr);
		Raycast.drawLine(Env.bl, Env.br);

		Raycast.drawLine(Env.tl, Env.bl);
		Raycast.drawLine(Env.tr, Env.br);
	};

	Env.draw = function(rel, renderDistance){

		Env.block.draw(rel, renderDistance);
		//Env.drawRayBoundary();
	};
	return Env;
});