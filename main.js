const canvas = document.getElementById("gameCanvas");
canvas.width = 400;

// Draw on the canvas
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.95);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
animate();

function animate(){
    car.update();

    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}

