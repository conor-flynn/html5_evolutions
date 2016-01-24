/*
    
*/

define([
    "src/_math/Vector2"
    ], function(
        Vector2
        ){

    var Raycast = {};

    // Storage
        var pool = [];
        function Color(){
            this.red     = "#ff0000";
            this.green   = "#00ff00";
            this.blue    = "#0000ff";
            this.black   = "#000000";
            this.yellow  = "#ffff00";
        }
        function Ray(){
            this.start = new Vector2();
            this.end = new Vector2();
            this.color = new Color();
            this.time = 0;
        }    
    // ~Storage

    // Intended to check for a collision between (start) and (end)
    // But the implementation depends on the situation
    Raycast.raycast = function(start, end){

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

        // for (
        //     var x=sX, y=sY;
        //     x < dX || y < dY;
        //     x+=sX, y+=sY){

        //     var point = new Vector2(x * xDir, y * yDir);
        //     point.increment(start);

        // // 'resolveLocation' checks the point in the world to see if anything 'collidable' is there
        //     var result = Grid.resolveLocation(point);
        //     if (result !== null) {
        //         if (result.hit_box !== undefined) {
        //             return{
        //                 hit: true,
        //                 point: point
        //             }
        //         }
        //     }
            
        // }
        



        return{
            hit : false,
            point: new Vector2()
        }
    };



    // Debug
    Raycast.drawLine = function(start, end, color, time){
        var ray = new Ray();
            ray.start  = start;
            ray.end    = end;
            ray.color = color;
            ray.time = time !== undefined ? time : 0;
        pool.push(ray);
    };

    Raycast.draw = function(ctx, rel, delta){
        var overFlow = [];
        for (var i = 0; i < pool.length; i++) {

            var start = pool[i].start;
            var end   = pool[i].end;
            var color = pool[i].color;


            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = color;
            ctx.stroke();

            pool[i].time -= delta;
            if(pool[i].time > 0) overFlow.push(pool[i]);
        };
        
        pool = [];
        pool = overFlow;
    };
    // End - debug

    return Raycast;
});