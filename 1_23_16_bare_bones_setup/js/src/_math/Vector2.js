/*
    
*/

define(function(){

    var Vector2 = Class.extend({

        init: function(x, y){
            if( x === undefined || y === undefined){
                this.x = 0;
                this.y = 0;
            }else{
                this.x = x;
                this.y = y;
            }
        },

        increment: function(vect){
            this.adjustX(vect.x);
            this.adjustY(vect.y);
            return this;
        },

        decrement: function(vect){
            this.adjustX(-vect.x);
            this.adjustY(-vect.y);
            return this;
        },

        getNorm: function(){
            var length = this.getMag();

            if(length == 0) return new Vector2(0,0);
            var vect = this.mimic();

            vect.x /= length;
            vect.y /= length;

            return vect;
        },

        normalize: function(){
            this.setPos(this.getNorm());
            return this;
        },

        invert: function(){
            this.x *= -1;
            this.y *= -1;
            return this;
        },

        amplify: function(value){
            this.x *= value;
            this.y *= value;
            return this;
        },

        getMag: function(){
            return Math.pow((Math.pow(this.x,2)) + (Math.pow(this.y,2)), 0.5);
        },

        mimic: function(){
            var v = new Vector2(this.x, this.y);
            return v;
        },

        setX: function(newX){           this.x = newX; return this; },
        setY: function(newY){           this.y = newY; return this; },
        setPos: function(newPos){       this.setX(newPos.x);
                                        this.setY(newPos.y); 
                                        return this; },

        adjustX: function(changeX){     this.x += changeX; return this; },
        adjustY: function(changeY){     this.y += changeY; return this; },

        toString: function(pure){

            if(pure){

                var first = Math.round(this.x*100)/100;
                var secon = Math.round(this.y*100)/100;

                var string = "~(" + first + "," + secon + ")";
                return string;
            }else{
                var string = "(" + this.x + "," + this.y + ")";
                return string;
            }
        }
    });

    Vector2.add = function(left, right){
        var first = left.mimic();
        var second = right.mimic();

        first.increment(second);

        return first;
    };

    Vector2.subtract = function(left, right){
        var first  = left.mimic();
        var second = right.mimic();

        first.decrement(second);

        return first;
    };

    Vector2.multiply = function(vect, scalar){
        var result = vect.mimic();
            result.x *= scalar;
            result.y *= scalar;
        return result;
    };

    Vector2.rotate = function(vect, angle){
        var theta = (angle / 180.0) * Math.PI;

        var result = new Vector2();
        result.x = (vect.x * Math.cos(theta)) - (vect.y * Math.sin(theta));
        result.y = (vect.x * Math.sin(theta)) + (vect.y * Math.cos(theta));
        return result;
    };

    Vector2.distance = function(start, end){

        var delX = Math.pow(end.x - start.x, 2);
        var delY = Math.pow(end.y - start.y, 2);

        return Math.pow(delX + delY, 0.5);

    };


    //===========================

    Vector2.zero = function(){ return new Vector2(0,0); };
    Vector2.right = function(){ return new Vector2(1,0); };
    Vector2.up = function(){ return new Vector2(0,-1); };
    Vector2.left = function(){ return new Vector2(-1,0); };
    Vector2.down = function(){ return new Vector2(0,1); };

    return Vector2;
});