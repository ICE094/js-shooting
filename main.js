let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tank_width = 30;
let tank_height = 40;
let tank_speed = 0.55;

let tank = new Map();
tank.set("X", canvas.width / 2);
tank.set("Y", canvas.height - 50);
tank.set("width", tank_width);
tank.set("height", tank_height);

let balls = [];
let ball_speed = 1.6;
let since_last_fire = performance.now();
let blocks = [];

let right_pressed = false;
let left_pressed = false;
let space_pressed = false;

document.addEventListener("keydown", KeyDownFunc, false);
document.addEventListener("keyup", KeyUpFunc, false);

function KeyDownFunc(e) {
  if (e.keyCode == 39) {
    right_pressed = true;
  } else if (e.keyCode == 37) {
    left_pressed = true;
  } else if (e.keyCode == 32) {
    space_pressed = true;
  }
}

function KeyUpFunc(e) {
  if (e.keyCode == 39) {
    right_pressed = false;
  } else if (e.keyCode == 37) {
    left_pressed = false;
  } else if (e.keyCode == 32) {
    space_pressed = false;
  }
}

function drawTank() {
  ctx.beginPath();
  ctx.rect(tank.get("X"), tank.get("Y"), tank_width, tank_height);
  ctx.fillStyle = "black";

  ctx.rect(tank.get("X") + tank_width / 2 - 5, tank.get("Y") - 15, 10, 15);
  ctx.fillStyle = "black";

  ctx.fill();
  ctx.closePath();
}

function drawNewBall(ball_X, ball_Y) {
  ctx.beginPath();
  ctx.arc(ball_X, ball_Y, 5, 0, Math.PI * 2);

  var ball = new Map();
  ball.set("X", ball_X);
  ball.set("Y", ball_Y);
  ball.set("width", 3);
  ball.set("height", 3);
  balls.push(ball);
  since_last_fire = performance.now();
}

function drawBalls() {
  for (var i = 0; i < balls.length; i++) {
    ctx.beginPath();
    ctx.arc(balls[i].get("X"), balls[i].get("Y"), 5, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }
}

function moverFunc() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].set("Y", blocks[i].get("Y") + tank_speed);
    if (blocks[i].get("Y") > canvas.width) {
      blocks.splice(i, 1);
    }
  }
}
function moveBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].set("Y", balls[i].get("Y") - ball_speed);
    if (balls[i].get("Y") < 0) {
      balls.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
  drawBalls();
  moveBalls();

  if (
    space_pressed &&
    balls.length < 10 &&
    performance.now() - since_last_fire > 500
  ) {
    drawNewBall(tank.get("X") + 15, tank.get("Y") - 30);
  }
  if (right_pressed && tank.get("X") + tank_width < canvas.width) {
    tank.set("X", tank.get("X") + 3);
  }
  if (left_pressed && tank.get("X") > 0) {
    tank.set("X", tank.get("X") - 3);
  }
  requestAnimationFrame(draw);
}

draw();
