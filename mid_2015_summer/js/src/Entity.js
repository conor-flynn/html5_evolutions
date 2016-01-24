/*
    (*) = Interface
    *Entity
        *Dynamic Entity
            Player
            *NPC
            *Undead
        *Static Entity
            *Interactable
                Door
                *Lootable
            *Terrain
                *Collidable
                    Wall
                *Walkable
                    Floor
*/

define([
    "src/Vector2"
    ], function(
        Vector2
        ){  

    /*
        Any 'thing' in the world
    */
    var Entity = Class.extend({
        /*
            Initialize the entity
                @position = vector position of the entity
                @image = image for drawing the image
        */
        init : function(position, image_name){
            this.position = position;
            this.image = content.get(image_name);
            this.image_name = image_name;
        },

        /*
            Draw the Entity relative to the passed position
            params
                @ctx = canvas context
                @relPos = draw relative to this position
        */  
        draw: function(ctx, relPos, renderDistance){ 
            
            if(this.image === undefined) return;
            if(Vector2.distance(this.position, relPos) > renderDistance) return;

            // First determine if this image should even be drawn


            var draw_x = (this.getX() - relPos.x) + canvas.width/2;
            var draw_y = (this.getY() - relPos.y) + canvas.width/2;


            // var draw_x = relPos.x - this.getX();
            // var draw_Y = relPos.y - this.getY();

            // var buffer = 32;

            // if(
            //     draw_x < -buffer || 
            //     draw_x > visual_width+buffer || 
            //     draw_y < -buffer || 
            //     draw_y > visual_height+buffer) return;

            ctx.drawImage(this.image, draw_x, draw_y);                
            
        },

        getX: function(){   return this.position.x; },
        getY: function(){   return this.position.y; },
        getPos: function(){ return this.position; },

        toString: function(toLog){
            var result = "";
            result += "Entity(";
            if(this.image)  result += "image_name:" + this.image_name;
            else            result += "no image";
            result += ")@" + this.position.toString() + " : ";
            if(toLog) console.log(result);
            return result;
        }
        
    });
    return Entity;
});