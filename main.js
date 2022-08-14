const canvas = document.getElementById("gameCanvas");
canvas.width = 400;

const numberOfLanes = 3;

// Draw on the canvas
const ctx = canvas.getContext("2d");
// Draw the road
const road = new Road(canvas.width/2, canvas.width*0.95, numberOfLanes);

// Add cars to the scene
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "Player");
// Add bots
const numberOfBots = 3;
const traffic = []; 
for (let botIndex = 0; botIndex < numberOfBots; botIndex++){
    let lane = Math.floor(Math.random() * numberOfLanes);
    let newCar = new Car(road.getLaneCenter(lane), 100, 30, 50, "NPC");
    traffic.push(newCar);
}


animate();

function animate(){
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, []); // currently the traffic doesn't interact with itself. 
    }
    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height/2);
    road.draw(ctx);
    car.draw(ctx);
    for(let i = 0; i < traffic.length; i++){
        traffic[i].draw(ctx);
    }
    ctx.restore();
    requestAnimationFrame(animate);
}

