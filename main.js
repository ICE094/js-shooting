let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tank_width = 30;
let tank_height = 40;
let tank_speed = 0.55;

let tank = new Map();
tank.set("X", canvas.width / 2);
tank.set("Y", canvas.height - 70);
tank.set("width", tank_width);
tank.set("height", tank_height);

let blocks = [];

let right_pressed = false;
let left_pressed = false;

document.addEventListener("keydown", KeyDownFunc, false);
document.addEventListener("keyup", KeyUpFunc, false);

function KeyDownFunc(e) {
  if (e.keyCode == 39) {
    right_pressed = true;
  } else if (e.keyCode == 37) {
    left_pressed = true;
  }
}

function KeyUpFunc(e) {
  if (e.keyCode == 39) {
    right_pressed = false;
  } else if (e.keyCode == 37) {
    left_pressed = false;
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

function moverFunc() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].set("Y", blocks[i].get("Y") + tank_speed);
    if (blocks[i].get("Y") > canvas.width) {
      blocks.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
  moverFunc();
  if (right_pressed && tank.get("X") + tank_width < canvas.width) {
    tank.set("X", tank.get("X") + 3);
  }
  if (left_pressed && tank.get("X") > 0) {
    tank.set("X", tank.get("X") - 3);
  }
  requestAnimationFrame(draw);
}

draw();
