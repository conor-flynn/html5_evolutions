/*
    
*/

define([
    "src/Vector2",
    "src/Ray",
    "src/RayPool"
    ], function(
        Vector2,
        Ray,
        RayPool
        ){

    var me = {};

    me.drawLine = function(start, end, color, time){
        var ray = new Ray();
            ray.start  = start;
            ray.end    = end;
            ray.isLine = true;
            ray.color = color;
            ray.time = time !== undefined ? time : 0;
        RayPool.add(ray);
    };

    me.drawRay = function(start, dir, color, time){
        var ray = new Ray();
            ray.start  = start;
            ray.dir    = dir;
            ray.isRay  = true;
            ray.color = color;
            ray.time = time !== undefined ? time : 0;
        RayPool.add(ray);
    };

    me.draw = function(ctx, relPos, delta){
        RayPool.draw(ctx, relPos, delta);
    };

    return me;
});