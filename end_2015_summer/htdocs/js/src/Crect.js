/*
    - Creates a rectangle from a Vector2.js location and hitbox size

    - Allows for intersection detection between `this` rectangle and a passed rectangle

    - Allows for intersection between 'this' and a point
*/

// Crect
define([
    "src/Vector2",
    "src/Raycast"
    ], function(
        Vector2,
        Raycast
        ){

    var Crect = Class.extend({

        //Takes a vector and the 'radius' of the hitbox
        init: function(origin, size, shouldOffset){

          
            this.width = size;

            var x = origin.x;
            var y = origin.y;

            if(shouldOffset){
                x += size/2;
                y += size/2;
            }
            
            this.center = new Vector2(x,y); // Center of the hitbox

            this.tl = new Vector2(x-size/2, y-size/2);
            this.tr = new Vector2(x+size/2, y-size/2);
            this.bl = new Vector2(x-size/2, y+size/2);
            this.br = new Vector2(x+size/2, y+size/2);

            this.x1 = this.tl.x;
            this.x2 = this.tr.x;
            this.y1 = this.bl.y;
            this.y2 = this.tl.y;
        },

        intersectRect: function(other){

            var xx1, xx2, yy1, yy2;

            xx1 = other.tl.x;
            xx2 = other.tr.x;
            yy1 = other.bl.y;
            yy2 = other.tl.y;


            if( this.x1 < xx2 && this.x2 > xx1 && this.y1 > yy2 && this.y2 < yy1 ){
                return true;
            }else{
                return false;
            }
        },

        intersectPoint: function(point){
            var tx = point.x;
            var ty = point.y;

            if( tx > this.x1 && tx < this.x2 && ty > this.y1 && ty < this.y2 ){
                return true;
            }else{
                return false;
            }
        },

        debugCrect: function(color){
            Raycast.drawLine(this.tl, this.tr, color);
            Raycast.drawLine(this.bl, this.br, color);
            Raycast.drawLine(this.tl, this.bl, color);
            Raycast.drawLine(this.tr, this.br, color);
        },

        toString: function(){
            var string = "Rect: " + this.center.toString() + "," + this.width;
            return string;
        }

    });
    return Crect;
});
