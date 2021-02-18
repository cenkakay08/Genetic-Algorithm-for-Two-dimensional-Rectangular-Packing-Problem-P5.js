let Rectangulars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < 100; i++) {
    Rectangulars[i] = new Rectangular(
      Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      Math.floor(Math.random() * (100 - 5 + 1)) + 5,
      Math.floor(Math.random() * (windowWidth - 100 - 1 + 1)) + 1,
      Math.floor(Math.random() * (windowHeight - 100 - 1 + 1)) + 1
    );
  }
  console.log(Rectangulars);
}

function draw() {
  background("#00203FFF");
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Rectangular {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(this.x, this.y, this.width, this.height);
  }
}
