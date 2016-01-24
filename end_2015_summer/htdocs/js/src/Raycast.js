/*
    
*/

define([
    "src/Vector2",
    "src/Ray",
    "src/RayPool",
    "src/Grid"
    ], function(
        Vector2,
        Ray,
        RayPool,
        Grid
        ){

    var me = {};

    me.raycast = function(start, end){

        var hit = false;
        var distance = -1;


        var difference = Vector2.subtract(end, start);
        var steps = difference.getMag()/1;
        steps = Math.round(steps);

        var dX = end.x - start.x;
        var dY = end.y - start.y;

        var xDir = 0;
            if(dX < 0) xDir = -1;
            if(dX > 0) xDir =  1;
        var yDir = 0;
            if(dY < 0) yDir = -1;
            if(dY > 0) yDir =  1;

        dX = Math.abs(dX);
        dY = Math.abs(dY);

        var sX = Math.abs(dX / steps);
        var sY = Math.abs(dY / steps);




        for (
            var x=sX, y=sY;
            x < dX || y < dY;
            x+=sX, y+=sY){

            var point = new Vector2(x * xDir, y * yDir);
            point.increment(start);

            var result = Grid.resolveLocation(point);
            if (result !== null) {
                if (result.hit_box !== undefined) {
                    return{
                        hit: true,
                        point: point
                    }
                }
            }
            
        }
        



        return{
            hit : false,
            point: point
        }
    };










    // Debug
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

    me.draw = function(ctx, rel, delta){
        RayPool.draw(ctx, rel, delta);
    };
    // End - debug

    return me;
});