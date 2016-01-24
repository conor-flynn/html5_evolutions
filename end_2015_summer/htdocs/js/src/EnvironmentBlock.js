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

            this.width = EnvironmentBuilder.getBlockForLayer(this.layers);
            this.center = this.location.mimic();
            this.center.increment(new Vector2(this.width/2, this.width/2));


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

            var walk = false;
            if(Math.random() > .15){
                walk = true;
            }

            for (var row = 0; row < this.tiles_per_block; row++) {
                for (var col = 0; col < this.tiles_per_block; col++) {

                  walk = false;
                    if(Math.random() > .01){
                        walk = true;
                    }

                    var location = EnvironmentBuilder.resolveToLocation(this.layers, col, row, this.location);
                    var newTile;

                    if(walk){
                        newTile = new Floor(location, "floor");
                    }else{
                        newTile = new Wall(location, "wall");
                    }

                    var index = col + (row*this.tiles_per_block);
                    this.tiles[index] = newTile;
                }
            }
        },

        distanceTo: function(rel) {
            return Vector2.distance(this.center, rel);
        },

        /*
            @ctx = canvas context
            @relPos = relative location to draw the environment around
        */
        draw: function(rel, render_distance){

            if (this.distanceTo(rel) > render_distance+this.width) return;

            if(this.block_holder){
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].draw(rel, render_distance);
                }
                var width = EnvironmentBuilder.getBlockForLayer(this.layers);
                var tl = this.location;
                var tr = new Vector2(tl.x + width, tl.y);
                var bl = new Vector2(tl.x, tl.y + width);
                var br = new Vector2(tl.x, tr.y);

                // Raycast.drawLine(tl, tr, "blue");
                // Raycast.drawLine(bl, br, "blue");
                // Raycast.drawLine(bl, tl, "blue");
                // Raycast.drawLine(br, tr, "blue");

            }else if(this.tile_holder){
                for (var i = 0; i < this.tiles.length; i++) {
                    this.tiles[i].draw(rel, render_distance);
                }
                var width = EnvironmentBuilder.getBlockForLayer(this.layers);
                var tl = this.location;
                var tr = new Vector2(tl.x + width, tl.y);
                var bl = new Vector2(tl.x, tl.y + width);
                var br = new Vector2(tl.x, tr.y);

                // Raycast.drawLine(tl, tr, "yellow");
                // Raycast.drawLine(bl, br, "yellow");
                // Raycast.drawLine(bl, tl, "yellow");
                // Raycast.drawLine(br, tr, "yellow");
            }
        }
        
    });
    return EnvironmentBlock;
});