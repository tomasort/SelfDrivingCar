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

        const topLeft = {
            x: this.left,
            y: this.top
        };
        const topRight = {
            x: this.right,
            y: this.top
        };
        const bottomLeft = {
            x: this.left,
            y: this.bottom
        };
        const bottomRight = {
            x: this.right,
            y: this.bottom
        };

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
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
        for (let i = 1; i < this.lanes; i++){
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(this.left + i*laneWidth, this.top);
            ctx.lineTo(this.left + i*laneWidth, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }

}