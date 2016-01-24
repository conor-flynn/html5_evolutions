/*
    Any entities that are moving at any point in their life 
        (does not include pure rotations like in doors)
*/

define([
    "src/Entity"
    ], function(
        Entity
        ){

    var DynamicEntity = Entity.extend({

        /*
            Updates 'current' so that it can't exist outside of the bounds of the map
        */
        adjustVectorForEdge: function(current){
        	console.log("deprecated");
            var width = this.image.width/2;
            if(current.x < width) current.x = width;
            if(current.x > game_width-width) current.x = game_width-width;

            if(current.y < width) current.y = width;
            if(current.y > game_height-width) current.y = game_height-width;
        },

        /*
            Assumes Image is a square
        */
        centerVectorToImageCenter: function(current){
            var result = new Vector2(current.x, current.y);
            result.x -= this.image.width/2;
            result.y -= this.image.width/2;
            return result;
        },

        setX: function(newX){           this.location.x = newX; },
        sety: function(newY){           this.location.y = newY; },
        setPos: function(newPos){       this.location = newPos; },

        adjustX: function(changeX){     this.location.x += changeX; },
        adjustY: function(changeY){     this.location.y += changeY; },

        addPos: function(changePos){    this.location.addVect(changePos); },
        subPos: function(changePos){    this.location.subVect(changePos); },

        toString: function(toLog){
            var result = "";
            result += "DynamicEntity : ";
            result += this._super(false);
            if(toLog) console.log(result);
            return result;
        }

    });
    return DynamicEntity;
});