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
    "src/Vector2",
    "src/Draw"
    ], function(
        Vector2,
        Draw
        ){  
    /*
        Any 'thing' in the world
    */
    var Entity = Class.extend({
        /*
            Initialize the entity
                @location = vector location of the entity
                @image_name = image for drawing the image
        */
        init : function(location, image_name, type){

            if (type === undefined) type = Draw.both_layers;

            this.location = location;


            switch (type) {
                case Draw.dark_layer:
                    this.image_dark = conteng.getDark(image_name);
                    this.image_type = type;
                    this.image_size = this.image_dark.width;
                break;
                case Draw.light_layer:
                    this.image_light = content.getLight(image_name);
                    this.image_type = type;
                    this.image_size = this.image_light.width;
                break;
                case Draw.both_layers:
                    this.image_dark = content.getDark(image_name);
                    this.image_light = content.getLight(image_name);
                    this.image_type = type;
                    this.image_size = this.image_dark.width;
                break;
                default:
                    console.log("bad type: " + image_name + "," + type);
                break;
            }
        },

        distanceTo: function(location) {
            var cross = this.getImage().width;
            return Vector2.distance(this.location, location) + cross;
        },

        getLight: function() {
            if (this.image_light !== undefined) {
                return this.image_light;
            }
            return undefined;
        },

        getDark: function() {
            if (this.image_dark !== undefined) {
                return this.image_dark;
            }
            return undefined;
        },

        getImage: function() {
            return (this.getDark() !== undefined) ? this.getDark() : this.getLight();
        },

        /*
            Draw the Entity relative to the passed location
            params
                @rel = draw relative to this location
        */  
        draw: function(rel, dist){ 
            
            if(this.distanceTo(rel) > dist) return;

            switch (this.image_type) {
                case Draw.dark_layer:
                    Draw.addDark(this.image_dark, this.location.mimic());
                break;
                case Draw.light_layer:
                    Draw.addLight(this.image_light, this.location.mimic());
                break;
                case 2:
                    Draw.addDark(this.image_dark, this.location.mimic());
                    Draw.addLight(this.image_light, this.location.mimic());
                break;
                default:
                    console.log("bad");
                break;
            }            
        },

        getX: function(){   return this.location.x; },
        getY: function(){   return this.location.y; },
        getLoc: function(){ return this.location.mimic(); },

        toString: function(toLog){
            var result = "";

            result += "Entity(";

            switch (this.image_type) {
                case Draw.dark_layer:
                    result += "only dark:" + this.image_dark;
                break;
                case Draw.light_layer:
                    result += "only light:" + this.image_light;
                break;
                case 2:
                    result += "both:" + this.image_dark + "," + this.image_light;
                break;
            } 
            result += ")";
            result += "@" + this.location.toString() + " : ";

            if(toLog) console.log(result);
            return result;
        }
        
    });
    return Entity;
});