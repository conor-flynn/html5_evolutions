/*
    - A human controlled player. MANY new functions from DynamicEntity
*/


define([
		"src/DynamicEntity",
		"src/Environment",
		"src/Vector2",
        "src/Raycast",
        "src/Grid",
        "src/Text",
        "src/Crect",
        "src/Collidable"
	], function(
			DynamicEntity,
			Environment,
			Vector2,
            Raycast,
            Grid,
            Text,
            Crect,
            Collidable
		){


    var Player = DynamicEntity.extend({

        init: function(){
            //this._super(new Vector2(canvas.width/2, canvas.width/2), "player");
            this._super(new Vector2(-10, -10), "player");
            this.angle = 0;
			this.no_clip = 0;	// 1: the player walks through walls,   0: the player collides with walls
        },

        draw: function(ctx, delta){
        	var draw_x = (canvas.width/2)  - (this.image.width/2);
			var draw_y = (canvas.width/2) - (this.image.width/2);

            Environment.draw(ctx, this.getPos());       // Draw the static terrain
            ctx.drawImage(this.image, draw_x, draw_y);  // Draw the player

            
            Raycast.draw(ctx, this.getPos(), delta);    // Draw all rays
            Text.draw(ctx, this.getPos());              // Draw all text
        },

        /*
            @input = the input database that tracks pressed/released
        */
        update: function(input, delta){

        	// Positions assumed to be the center of the player's image
            var old_position = this.position.mimic();
            var new_position = this.getMovement(input, delta);

            var diff = Vector2.subtract(new_position, old_position);
                diff = Vector2.multiply(diff, 10);

            Raycast.drawRay(new_position, diff);

            var delX = new_position.x - old_position.x;
            var delY = new_position.y - old_position.y;


            var self = new Crect(new_position, this.image.width, false);
                self.debugCrect();


            var div = 8;
            var range = 8;	// How many spaces does the player check for collision. At the current player-speed, only range=2 is needed.
            for (var x = -range; x <= range; x++) {
                for (var y = -range; y <= range; y++) {
                    var temp = new_position.mimic();
                    temp.increment(new Vector2(x*div, y*div));

                    var result = Grid.resolveLocation(temp);
                    if (result !== null && result instanceof Collidable) {
                        var updated = Vector2.add(
                                        old_position,
                                        new Vector2(delX, delY)
                                        );
                        var change = this.care(
                                        old_position, 
                                        delX, 
                                        delY,
                                        new Crect(
                                            updated,
                                            this.image.width),
                                        result.hit_box);
                        delX = change.x;
                        delY = change.y;
                    }
                }
            }

            // console.log("final: " + delX + "," + delY);

            this.setPos(
                    Vector2.add(
                            old_position, 
                            new Vector2(delX, delY)
                            )
                    );
        },

        /*
            @position is the new position of the character based on user input
            @character is the hit box of the character
            @other is the hit box of some environment object we are testing against

            result:
                Adjust position if it ends up colliding
        */
        care: function(old, delX, delY, cur, other){
            var xBox = new Crect(new Vector2(old.x + delX, old.y), this.image.width);
            var yBox = new Crect(new Vector2(old.x, old.y + delY), this.image.width);

            var xCol = false;
            var yCol = false;

			
			
			
			// Does the player collide with walls :: Comment out from here to 'end' tag to remove wall collision
				if (this.no_clip === 0) {
		            if (delX !== 0 && other.intersectRect(xBox)) { 
		                delX = 0;
		                xCol = true;
		            }
		            if (delY !== 0 && other.intersectRect(yBox)) {
		                delY = 0;
		                yCol = true;
		            }
				}
			// End of 'Does the player collide with walls'
			
			
			

            // if (!xCol && !yCol) {
            //     if (cur.intersectRect(other)) {
            //         xCol = true;
            //         yCol = true;
            //         delX = delY = 0;
            //     }
            // }

            if (xCol || yCol) {
                other.debugCrect("red");
            } else {
                other.debugCrect("green");
            }

            // if(self.intersectRect(other)){
            //     var xBox = new Crect(new Vector2(old.x + delX, old.y), this.image.width);
            //     var yBox = new Crect(new Vector2(old.x, old.y + delY), this.image.width);


            //     if (delX !== 0 && other.intersectRect(xBox)) { 
            //         delX = 0;
            //     }
            //     if (delY !== 0 && other.intersectRect(yBox)) {
            //         delY = 0;
            //     }
            // }
            return{
                x: delX,
                y: delY
            }
        },

        getMovement: function(input, delta){
            var changed = this.position.mimic();
            var speed = (200*delta);

            var delta = new Vector2();

            if(input.down("left")){
            	delta.adjustX(-1);
            }
            if(input.down("right")){
            	delta.adjustX(1);
            }
            if(input.down("up")){
            	delta.adjustY(-1);
            }
            if(input.down("down")){
                delta.adjustY(1);
            }

            delta.normalize();
            delta.amplify(speed);

            changed.increment(delta);

            return changed;
        },

        toString: function(toLog){
            var result = "";
            result += "Player : ";
            result += this._super(false);
            if(toLog) console.log(result);
            return result;
        }
    });
    return Player;
});