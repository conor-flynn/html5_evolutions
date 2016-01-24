/*

*/

define([
    "src/Vector2",
    "src/Wall",
    "src/Floor",
    "src/EnvironmentBuilder",
    "src/Raycast"
    ], function(
        Vector2,
        Wall,
        Floor,
        EnvironmentBuilder,
        Raycast
        ){

    var EnvironmentBlock = Class.extend({

        init: function(location, layers, blocks_per_block, tiles_per_block){

            this.location = location;
            this.layers = layers;
            this.blocks_per_block = blocks_per_block;
            this.tiles_per_block = tiles_per_block;

            this.blocks = [];
            this.tiles = [];
            this.block_holder = false;
            this.tile_holder = false;
            /*
                @location = top-left location of this block

                @layers =   if greater than 0: this block contains an array of other blocks
                            if equal to 0: this block contains an array of tiles
                @blocks_per_block = used when 'layers' > 0
                @tiles_per_block  = used when 'layers' = 0
            */

            if(this.layers > 0){
                this.block_holder = true;
                this.constructBlockHolder();
            }else{
                this.tile_holder = true;
                this.constructTileHolder();
            }
        },

        // Assumes to have more layers to travel down
        constructBlockHolder: function(){
            this.blocks = new Array(this.blocks_per_block*this.blocks_per_block);

            for (var row = 0; row < this.blocks_per_block; row++) {
                for (var col = 0; col < this.blocks_per_block; col++) {

                    var location = EnvironmentBuilder.resolveToLocation(this.layers, col, row, this.location);

                    var newBlock = new EnvironmentBlock(location, this.layers-1, this.blocks_per_block, this.tiles_per_block);

                    var index = col + (row*this.blocks_per_block);
                    this.blocks[index] = newBlock;
                }
            }
        },

        // Assumes to have no more layers: this is the lowest order block
        constructTileHolder: function(){
            this.tiles = new Array(this.tiles_per_block*this.tiles_per_block);

            for (var row = 0; row < this.tiles_per_block; row++) {
                for (var col = 0; col < this.tiles_per_block; col++) {

                  var walk = false;
                    if(Math.random() > 0.05){	// This is how dense walls are. If the value is '1', then all of the terrain spots are walls. If the value is '0', then all of the terrain spots are floors (ie walkable)
                        walk = true;
                    }

                    var location = EnvironmentBuilder.resolveToLocation(this.layers, col, row, this.location);
                    var newTile;

                    if(walk){
                        newTile = new Floor(location, "");
                    }else{
                        newTile = new Wall(location, "block");
                    }

                    var index = col + (row*this.tiles_per_block);
                    this.tiles[index] = newTile;
                }
            }
        },

        /*
            @ctx = canvas context
            @relPos = relative position to draw the environment around
        */
        draw: function(ctx, relPos, render_distance){
            if(this.block_holder){
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].draw(ctx, relPos, render_distance);
                }
                var width = EnvironmentBuilder.getBlockForLayer(this.layers);
                var tl = this.location;
                var tr = new Vector2(tl.x + width, tl.y);
                var bl = new Vector2(tl.x, tl.y + width);
                var br = new Vector2(tl.x, tr.y);

                Raycast.drawLine(tl, tr, "blue");
                Raycast.drawLine(bl, br, "blue");
                Raycast.drawLine(bl, tl, "blue");
                Raycast.drawLine(br, tr, "blue");

            }else if(this.tile_holder){
                for (var i = 0; i < this.tiles.length; i++) {
                    this.tiles[i].draw(ctx, relPos, render_distance);
                }
                var width = EnvironmentBuilder.getBlockForLayer(this.layers);
                var tl = this.location;
                var tr = new Vector2(tl.x + width, tl.y);
                var bl = new Vector2(tl.x, tl.y + width);
                var br = new Vector2(tl.x, tr.y);

                Raycast.drawLine(tl, tr, "yellow");
                Raycast.drawLine(bl, br, "yellow");
                Raycast.drawLine(bl, tl, "yellow");
                Raycast.drawLine(br, tr, "yellow");
            }else{
                console.log("null");
            }
        }
        
    });
    return EnvironmentBlock;
});