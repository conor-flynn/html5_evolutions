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
        "src/Collidable",
        "src/EnvironmentBuilder",
        "src/Draw",
        "src/Poly"
	], function(
			DynamicEntity,
			Environment,
			Vector2,
            Raycast,
            Grid,
            Text,
            Crect,
            Collidable,
            EnvironmentBuilder,
            Draw,
            Poly
		){

    var Player = DynamicEntity.extend({
        init: function(){
            this._super(new Vector2(0, 0), "player", Draw.light_layer);
        },

        draw: function(ctx, delta){
            Draw.addLight(this.getLight(), this.location);
        },

        movementControl : function(input, delta){

            // locations assumed to be the center of the player's image
            var old_location = this.location.mimic();
            var new_location = this.getMovement(input, delta);
                new_location.x = Math.round(new_location.x);
                new_location.y = Math.round(new_location.y);

            var delX = new_location.x - old_location.x;
            var delY = new_location.y - old_location.y;


            /*var self = new Crect(new_location, this.image.width, false);
                self.debugCrect();*/


            /*var div = 8;
            var range = 2;
            for (var x = -range; x <= range; x++) {
                for (var y = -range; y <= range; y++) {
                    var temp = new_location.mimic();
                    temp.increment(new Vector2(x*div, y*div));

                    var result = Grid.resolveLocation(temp);
                    if (result !== null && result instanceof Collidable) {
                        var updated = Vector2.add(
                                        old_location,
                                        new Vector2(delX, delY)
                                        );
                        var change = this.care(
                                        old_location, 
                                        delX, 
                                        delY,
                                        result.hit_box);
                        delX = change.x;
                        delY = change.y;
                    }
                }
            }*/

            delX = Math.round(delX);
            delY = Math.round(delY);

            this.setPos(
                    Vector2.add(
                            old_location, 
                            new Vector2(delX, delY)
                            )
                    );
        },

        /*
            @input = the input database that tracks pressed/released
        */
        update: function(input, delta){
            this.movementControl(input, delta);

            var point = new Vector2(input.mouse.x, input.mouse.y);
            point = Grid.convertScreenToWorld(point, this.location);
            var mine = Vector2.add(this.location, new Vector2(8,8));
            Raycast.drawLine(this.location, point);

            var direction = Vector2.subtract(point, this.location);

            // var inter = new Poly();
            //     inter.addPoint(Vector2.add(this.location, Vector2.left() .amplify( 100)));
            //     inter.addPoint(Vector2.add(this.location, Vector2.up()   .amplify( 100)));
            //     inter.addPoint(Vector2.add(this.location, Vector2.right().amplify( 100)));
            //     inter.addPoint(Vector2.add(this.location, Vector2.down() .amplify( 100)));



            var inter = new Poly();
                inter.addPoint(mine);
                inter.addPoint(
                    Vector2.add(
                        mine,
                        Vector2.rotate(direction,-30).normalize().amplify(direction.getMag())
                    ));
                inter.addPoint(
                    Vector2.add(
                        mine,
                        Vector2.rotate(direction, 30).normalize().amplify(direction.getMag())
                    ));
            Draw.addLightBlocker(inter);

            // var other = new Poly();
                // other.addPoint(Vector2.add(this.location, new Vector2(-32,-32)));
                // other.addPoint(Vector2.add(this.location, new Vector2(32,-32)));
                // other.addPoint(Vector2.add(this.location, new Vector2(32,32)));
                // other.addPoint(Vector2.add(this.location, new Vector2(-32,32)));
                // /*other.addPoint(this.location);
                // other.addPoint(Vector2.add(this.location, new Vector2(16,0)));
                // other.addPoint(Vector2.add(this.location, new Vector2(16,16)));
                // other.addPoint(Vector2.add(this.location, new Vector2(0,16)));*/
            // Draw.addLightBlocker(other);
            // other.debug();


            var test = new Crect(this.location, 16);
            test.debugCrect();

            

            /*var base = Vector2.up();

            this.adjust = this.adjust !== undefined ? this.adjust+delta*100 : this.adjust = 0;
            this.adjust = 0;
            if(this.adjust >= 360) this.adjust = 0;

            for (var angle = 0+this.adjust; angle < 360+this.adjust; angle+= 1) {
                var dir = Vector2.rotate(base, angle);
                dir.amplify(500);

                var result = Raycast.raycast(
                    this.location, 
                    Vector2.add(this.location, dir));


                Raycast.drawLine(this.location, result.point, "red");
            }

            var target = new Vector2(input.mouse.x, input.mouse.y);

            target = Grid.convertScreenToWorld(target, this.location);

            Raycast.drawLine(this.location, target, "red");

            Raycast.raycast(this.location, target);*/

        },

        /*
            @@@ = Applied against each possible collider in our area
                : returns the adjusted deltas based on collisions

            @old = the unchanged location from the previous frame
            @delX = x movement
            @delY = y movement
            @other = the hitbox we are testing against 
        */
        care: function(old, delX, delY, other){
            var xBox = new Crect(new Vector2(old.x + delX, old.y), this.image.width);
            var yBox = new Crect(new Vector2(old.x, old.y + delY), this.image.width);

            var xCol = false;
            var yCol = false;

            if (delX !== 0 && other.intersectRect(xBox)) { 
                delX = 0;
                xCol = true;
            }
            if (delY !== 0 && other.intersectRect(yBox)) {
                delY = 0;
                yCol = true;
            }

            //--

            if (xCol || yCol) {
                other.debugCrect("red");
            } else {
                other.debugCrect("green");
            }

            //--

            return{
                x: delX,
                y: delY
            }
        },

        getMovement: function(input, delta){
            var changed = this.location.mimic();
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