class Car {

    constructor(x, y, width, height, controlType, traffic){
        let maxPlayerVelocity = 5;
        let maxNPCVelocity = 2;
        // Position of the car
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Car movement
        this.controls = new Controls(controlType);
        this.angle = 0;
        this.collision = false;

        this.velocity = 0.0;
        this.acceleration = 0.2;
        switch(controlType){
            case "Player":
                this.maxVelocity = maxPlayerVelocity;
                this.sensor = new Sensors(this);
                break;
            case "NPC":
                this.maxVelocity = maxNPCVelocity;
        }

        this.friction = 0.05;

    }

    #createPolygon(){
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });

        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return points;

    }

    #move(){
        if (this.controls.forward){
            this.velocity += this.acceleration;
        }
        if (this.controls.reverse){
            this.velocity -= this.acceleration;
        }

        if(this.velocity > this.maxVelocity){
            this.velocity = this.maxVelocity;
        }
        if(this.velocity < -this.maxVelocity){
            this.velocity = -this.maxVelocity;
        }
        if(this.velocity > 0){
            this.velocity -= this.friction;
        }
        if(this.velocity < 0){
            this.velocity += this.friction;
        }
        if(Math.abs(this.velocity) < this.friction){
            this.velocity = 0;
        }

        // Turns
        if(this.velocity != 0){
            const flip = this.velocity > 0 ? 1 : -1;
            if (this.controls.right){
                this.angle -= flip * 0.03;
            }
            if (this.controls.left){
                this.angle += flip * 0.03;
            }
        }
        this.x -= Math.sin(this.angle)*this.velocity;
        this.y -= Math.cos(this.angle)*this.velocity;

    }

    #checkCollision(roadBorders, traffic){
        for(let i = 0; i < roadBorders.length; i++){
            if (polysIntersection(this.polygon, roadBorders[i])){
                return true;
            }
        }
        for(let i = 0; i < traffic.length; i++){
            console.log(polysIntersection(this.polygon, traffic[i].polygon));
            if (polysIntersection(this.polygon, traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }

    update(roadBorders, traffic){
        if (!this.collision){
            this.#move();
            this.polygon = this.#createPolygon();
            this.collision = this.#checkCollision(roadBorders, traffic);
        }
        if (this.sensor){
            this.sensor.update(roadBorders, traffic);
        }
    }

    draw(ctx){
        if (this.collision){
            ctx.fillStyle = "gray";
        }else{
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i = 1; i < this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
        if (this.sensor){
            this.sensor.draw(ctx);
        }
    }

}