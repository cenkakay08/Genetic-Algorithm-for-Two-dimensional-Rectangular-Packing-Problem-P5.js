let Rectangulars = [];
let Border_line_x_point = 300;
let All_lines = [];
let a = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid();
  for (i = 0; i < 20; i++) {
    Rectangulars[i] = new Rectangular(
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (windowWidth - 100 - 1 + 1)) + 1,
      Math.floor(Math.random() * (windowHeight - 100 - 1 + 1)) + 1,
      i
    );
  }
  console.log(Rectangulars);
  for (i = 0; i < windowHeight; i++) {
    All_lines[i] = new All_line(0, Border_line_x_point, i);
  }
  var button = createButton("bottom left");
  button.position(windowWidth - 100, windowHeight - 100);
  button.mousePressed(order);
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
  var bestLine = getBestLine(Rectangulars[a].width);
  Rectangulars[a].x = bestLine.startPoint_x;
  Rectangulars[a].y = bestLine.startPoint_y - (Rectangulars[a].height - 1);
  updateLines(Rectangulars[a]);
  a = a + 1;
}
function updateLines(PlacedRectangular) {
  var PlacedRectangularY = PlacedRectangular.y;
  var PlacedRectangularX = PlacedRectangular.x;
  for (i = 0; i < PlacedRectangular.height; i++) {
    for (k = 0; k < All_lines.length; k++) {
      if (PlacedRectangularY == All_lines[k].startPoint_y) {
        if (PlacedRectangular.x >= All_lines[k].startPoint_x) {
          if (PlacedRectangular.x <= All_lines[k].endPoint_x) {
            if (
              All_lines[k].startPoint_x < PlacedRectangularX &&
              PlacedRectangularX + PlacedRectangular.width <
                All_lines[k].endPoint_x
            ) {
              temp = All_lines[k].endPoint_x;
              All_lines[k].endPoint_x = PlacedRectangularX;

              All_lines.push(
                new All_line(
                  PlacedRectangularX + PlacedRectangular.width,
                  temp,
                  All_lines[k].startPoint_y
                )
              );
              PlacedRectangularY = PlacedRectangularY + 1;
              SortTheLines();
            } else if (
              All_lines[k].startPoint_x == PlacedRectangularX &&
              All_lines[k].endPoint_x >
                PlacedRectangularX + PlacedRectangular.width
            ) {
              All_lines[k].startPoint_x =
                PlacedRectangularX + PlacedRectangular.width;
              PlacedRectangularY = PlacedRectangularY + 1;
              SortTheLines();
            } else if (
              All_lines[k].endPoint_x ==
                PlacedRectangularX + PlacedRectangular.width &&
              All_lines[k].startPoint_x == PlacedRectangularX
            ) {
              All_lines[k].startPoint_y = 0;
              PlacedRectangularY = PlacedRectangularY + 1;
              SortTheLines();
            }
          }
        }
      }
    }
  }
  console.log(All_lines);
}

function getBestLine(widthofRectangular) {
  SortTheLines();
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
function SortTheLines() {
  All_lines.sort((a, b) => {
    if (a.startPoint_y == b.startPoint_y) {
      return a.startPoint_x - b.startPoint_x;
    }
    return b.startPoint_y - a.startPoint_y;
  });
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
  constructor(startPoint_x, endPoint_x, startPoint_y) {
    this.startPoint_x = startPoint_x;
    this.endPoint_x = endPoint_x;
    this.startPoint_y = startPoint_y;
  }
  show() {}
  getY() {
    return this.startPoint_y;
  }
  getX() {
    return this.startPoint_x;
  }
}
