class Car {

    constructor(x, y, width, height){
        // Position of the car
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Car movement
        this.controls = new Controls;
        this.x = x;
        this.y = y;

        this.x_velocity = 0.0;
        this.x_acceleration = 0.2;

        this.y_velocity = 0.0;
        this.y_acceleration = 0.2;
    }

    update(){
        if (this.controls.forward){
            this.y_velocity = this.y_velocity - this.y_acceleration;
        }else if (this.controls.reverse){
            this.y_velocity = this.y_velocity + this.y_acceleration;
        }else if (this.controls.left){
            this.x_velocity = this.x_velocity - this.x_acceleration;
        }else if (this.controls.right){
            this.x_velocity = this.x_velocity + this.x_acceleration;
        }
        this.x = this.x + this.x_velocity;
        this.y = this.y + this.y_velocity;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        ctx.fill();
    }

}