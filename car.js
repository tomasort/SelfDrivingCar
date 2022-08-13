class Car {

    constructor(x, y, width, height){
        // Position of the car
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Car movement
        this.controls = new Controls;
        this.angle = 0;

        this.velocity = 0.0;
        this.acceleration = 0.2;

        this.maxVelocity = 1;
        this.friction = 0.05;
    }

    update(){
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
        if(this.velocity != 0){
            const flip = this.velocity > 0 ? 1 : -1;
            // Turns
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

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.fill();
    }

}