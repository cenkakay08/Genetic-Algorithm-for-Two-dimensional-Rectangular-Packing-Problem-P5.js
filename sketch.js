let Rectangulars = [];
let Border_line_x_point = 500;
let Avaliable_points = [];
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
  //initial point of the empty bin
  Avaliable_points[0] = new Avaliable_point(0, windowHeight);
  console.log(Avaliable_points);

  var button = createButton("bottom left");
  button.position(windowWidth - 100, windowHeight - 100);
  button.mousePressed(bottomLeft);
  console.log(Rectangulars);
}

function draw() {
  background("#E2F0FF");
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show();
  }

  line(Border_line_x_point, 0, Border_line_x_point, windowHeight);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function bottomLeft() {
  for (i = 0; i <= 10; i++) {
    console.log(Avaliable_points);
    Rectangulars[i].x = Avaliable_points[0].getX();
    Rectangulars[i].y = Avaliable_points[0].getY() - Rectangulars[i].height;

    update_Avaliable_points(Avaliable_points[0], Rectangulars[i]);
  }
}

function update_Avaliable_points(filled_point, filled_rectangular) {
  /*   var newPoint1 = new Avaliable_point(
    filled_point.getX(),
    filled_point.getY() - filled_rectangular.height
  );
  Avaliable_points.push(newPoint1); */
  var newPoint2 = new Avaliable_point(
    filled_point.getX() + filled_rectangular.width,
    filled_point.getY()
  );

  Avaliable_points.push(newPoint2);
  Avaliable_points = Avaliable_points.filter(
    (element) => element !== filled_point
  );

  console.log(Avaliable_points);
}
function getBestPoint() {}

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
class Avaliable_point {
  constructor(startPoint_x, startPoint_y, empty = true) {
    this.startPoint_x = startPoint_x;
    this.startPoint_y = startPoint_y;
    this.empty = empty;
  }
  getY() {
    return this.startPoint_y;
  }
  getX() {
    return this.startPoint_x;
  }
  setEmptyTrue() {
    this.empty = true;
  }
}
