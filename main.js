const canvas = document.getElementById("gameCanvas");
canvas.height = window.innerHeight;
canvas.width = 400;

// Draw on the canvas
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

