let Rectangulars = [];
let Border_line_x_point = 300;
let All_lines = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid();
  for (i = 0; i < 100; i++) {
    Rectangulars[i] = new Rectangular(
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (windowWidth - 100 - 1 + 1)) + 1,
      Math.floor(Math.random() * (windowHeight - 100 - 1 + 1)) + 1,
      i
    );
  }
  for (i = 0; i < windowHeight; i++) {
    All_lines[i] = new All_line(0, i, Border_line_x_point);
  }
  console.log(All_lines);
  var button = createButton("bottom left");
  button.position(windowWidth - 100, windowHeight - 100);
  button.mousePressed(order);
  console.log(Rectangulars);
}

function draw() {
  background("#E2F0FF");
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show();
  }

  strokeWeight(1);
  line(Border_line_x_point, 0, Border_line_x_point, windowHeight);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function order() {
  var bestLine = getBestLine(Rectangulars[0].width);
  Rectangulars[0].x = bestLine.startPoint_x;
  Rectangulars[0].y = bestLine.startPoint_y - (Rectangulars[0].height - 1);
  updateLines(Rectangulars[0]);
}
function updateLines(PlacedRectangular) {
  var PlacedRectangularY = PlacedRectangular.y;
  for (i = 0; i < PlacedRectangular.height; i++) {
    for (k = 0; k < All_lines.length; k++) {
      if (PlacedRectangularY == All_lines[k].startPoint_y) {
        if (PlacedRectangular.x >= All_lines[k].startPoint_x) {
          if (PlacedRectangular.x <= All_lines[k].endPoint_x) {
            All_lines[k].startPoint_x =
              All_lines[k].startPoint_x + PlacedRectangular.width;
            PlacedRectangularY = PlacedRectangularY + 1;
          }
        }
      }
    }
  }
  console.log(All_lines);
}

function getBestLine(widthofRectangular) {
  All_lines.sort((a, b) => {
    if (a.startPoint_y == b.startPoint_y) {
      return a.startPoint_x - b.startPoint_x;
    }
    return b.startPoint_y - a.startPoint_y;
  });
  for (i = 0; i < All_lines.length; i++) {
    if (
      widthofRectangular <=
      All_lines[i].endPoint_x - All_lines[i].startPoint_x
    ) {
      console.log(All_lines[i]);
      return All_lines[i];
    }
  }
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
class All_line {
  constructor(startPoint_x, startPoint_y, endPoint_x) {
    this.startPoint_x = startPoint_x;
    this.startPoint_y = startPoint_y;
    this.endPoint_x = endPoint_x;
  }
  show() {}
  getY() {
    return this.startPoint_y;
  }
  getX() {
    return this.startPoint_x;
  }
}
