/*

*/

define([
	"src/Vector2",
	"src/EnvironmentBlock"
	], function(
		Vector2,
		EnvironmentBlock
		) {

	var me = {};

	me.settings = function(num_layers, blocks_per_block, tiles_per_block, tile_size, core){
		me.num_layers = num_layers;
		me.blocks_per_block = blocks_per_block;
		me.tiles_per_block = tiles_per_block;
		me.tile_size = tile_size;

		me.block = core;
	};

	me.getBlockForLayer = function(layer){
		if(layer == -1) return me.tile_size;    // The size of the tiles
        var size = me.tiles_per_block * me.tile_size * Math.pow(me.blocks_per_block, layer);

        return size;
	};

	/*
		Go from 'location' to 'tile'
	*/
	me.resolveLocation = function(location){
		var current = me.num_layers -1;	// Start at highest layer

		var block = me.block;

		var _x = 0;
		var _y = 0;
		var point = new Vector2(0,0);
		var adjusted = new Vector2(0,0);

		while (true) {

			adjusted = Vector2.subtract(location, point);

			var width = me.getBlockForLayer(current);

			var col = Math.floor(adjusted.x / width);
			var row = Math.floor(adjusted.y / width);

			if(block.block_holder){
				var index = col + (row*block.blocks_per_block);
				block = block.blocks[index];
				if(block === undefined) return null;
				point = block.location;
			}else{
				var index = col + (row*block.tiles_per_block);
				if(index >= block.tiles.length || index < 0) return null;
				else return block.tiles[index];
			}
			current--;
		}
	};


	//====== Convert game to screen positions
	me.convertWorldToScreen = function(position, relPos){

		var adjusted_x = (position.x - relPos.x) + canvas.width/2;
        var adjusted_y = (position.y - relPos.y) + canvas.width/2;

        var result = new Vector2(adjusted_x, adjusted_y);
        return result;
	};
	//=======================================


	return me;
});