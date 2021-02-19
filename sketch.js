let Rectangulars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < 100; i++) {
    Rectangulars[i] = new Rectangular(
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (windowWidth - 100 - 1 + 1)) + 1,
      Math.floor(Math.random() * (windowHeight - 100 - 1 + 1)) + 1,
      i
    );
  }
  var button = createButton("bottom left");
  button.position(windowWidth - 100, windowHeight - 100);
  button.mousePressed(bottomLeft);
  console.log(Rectangulars);
}

function draw() {
  background("#C6E2FF");
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function bottomLeft() {
  Rectangulars[0].x = 0;
  Rectangulars[0].y = 0;
}
class Rectangular {
  constructor(width, height, x, y, id) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.id = id;
  }
  show() {
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(1);
    text(this.id, this.x + this.width / 2, this.y + this.height / 2);
  }
}
