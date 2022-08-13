class Road{

    constructor(x, width, lanes=3){
        this.x = x;
        this.width = width;
        this.lanes = lanes;
        this.left = x - width/2;
        this.right = x + width/2;

        const infinity = 100000;
        this.top = -infinity;
        this.bottom = +infinity;
    }

    getLaneCenter(laneNumber){
        const laneWidth = this.width / this.lanes;
        return this.left+laneWidth/2 + laneWidth * laneNumber;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // Draw the lanes
        let laneWidth = this.width / this.lanes;
        for (let i = 0; i <= this.lanes; i++){
            if (i > 0 && i < this.lanes){
                ctx.setLineDash([20, 20]);
            }else{
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(this.left + i*laneWidth, this.top);
            ctx.lineTo(this.left + i*laneWidth, this.bottom);
            ctx.stroke();
        }
    }

}