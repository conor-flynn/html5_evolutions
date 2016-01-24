/*

*/

define([
	"src/Vector2"
	], function(
		Vector2
		) {
	var me = {};

	/*
		Environment settings :
		@num_layers = number(blocks of blocks of blocks of..)
		@blocks_per_block = .
		@tiles_per_block  = .
		@tile_size = standardized to 8
	*/
	me.settings = function(num_layers, blocks_per_block, tiles_per_block, tile_size){
		me.num_layers = num_layers;
		me.blocks_per_block = blocks_per_block;
		me.tiles_per_block = tiles_per_block;
		me.tile_size = tile_size;
	};

	/*
		A layer is composed of 'x' number of blocks
			This returns the width of one of those blocks for a given layer
	*/
	me.getBlockForLayer = function(layer){
		if(layer == -1) return me.tile_size;    // The size of the tiles
        var size = me.tiles_per_block * me.tile_size * Math.pow(me.blocks_per_block, layer);

        return size;
	};

	/*
		Used specifically for assigning locations while building the environent
			Doesn't work in an isolated situation. Depends on a previous location
	*/
	me.resolveToLocation = function(layer, col, row, offset){
		var width = me.getBlockForLayer(layer-1);
        var location = new Vector2(width*col, width*row);
        location.increment(offset);

        return location;
	};


	/*
		Go from 'location' to 'tile'
	*/
	me.resolveLocation = function(location){
		var current = me.num_layers;	// Start at highest layer

		var block = Environment.block;

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
				point = block.location;
			}else{
				var index = col + (row*block.tiles_per_block);
				return block.tiles[index];
			}
			current--;
		}
	};

	return me;
});