class Sensors{

    constructor(car){
        this.car = car;
        this.rayCount=10;
        this.rayReach = 100; 
        this.raySpread = 2 * Math.PI; 

        this.rays = [];
    }

    draw(ctx){
        for(let i = 0; i < this.rayCount; i++){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.stroke();
        }
    }

    update(){
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(this.raySpread/2, -this.raySpread/2, i/(this.rayCount-1)) + this.car.angle; 
            const start = {
                x: this.car.x, 
                y: this.car.y
            };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayReach,
                y: this.car.y - Math.cos(rayAngle) * this.rayReach
            };

            this.rays.push([start, end]);
        }

    }
}