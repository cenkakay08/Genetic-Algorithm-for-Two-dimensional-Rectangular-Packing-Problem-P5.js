// EmptY arraY for Rectangulars.
let Rectangulars = [];

// Bin corner border value.
let Border_line_X = 800;

// EmptY arraY for lines.
let All_lines = [];

// Set number for quantity of random Rectangulars.
let Number_for_random_rectangulars = 165;

// Empty array for used best lines.
let Used_best_lines = [];

function setup() {
  // Canvas created according to Window dimensions.
  createCanvas(windowWidth, windowHeight);
  // Create Rectangulars that has random height and width size.
  for (i = 0; i < Number_for_random_rectangulars; i++) {
    Rectangulars[i] = new Rectangular(
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      Math.floor(Math.random() * (windowWidth - 100 - 1 + 1)) + 1,
      Math.floor(Math.random() * (windowHeight - 100 - 1 + 1)) + 1,
      i
    );
  }

  // Created all lines for the placement of Rectangulars.
  for (i = 0; i < windowHeight; i++) {
    All_lines[i] = new All_line(0, Border_line_X, i);
  }

  var button = createButton("bottom left");
  button.position(windowWidth - 100, windowHeight - 100);
  button.mousePressed(() => SkylineBottomLeftOrder());
}

function draw() {
  // Background color
  background("#E2F0FF");

  // Draw the all Rectangulars
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show();
  }

  // Draw corner border line
  strokeWeight(1);
  line(Border_line_X, 0, Border_line_X, windowHeight);
}

// Function for resize Canvas according to Window dimensions.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//
function SkylineBottomLeftOrder() {
  for (z = 0; z < Rectangulars.length; z++) {
    var bestLine = getBestLine(Rectangulars[z]);
    Rectangulars[z].X = bestLine.Start_point_X;
    Rectangulars[z].Y = bestLine.Y - Rectangulars[z].height;
    updateLines(Rectangulars[z]);
    SortTheLines();
  }
}
function updateLines(PlacedRectangular) {
  var PlacedRectangularY = PlacedRectangular.Y;

  for (i = 0; i < PlacedRectangular.height + 1; i++) {
    for (k = 0; k < All_lines.length; k++) {
      // Aynı y sırasında olanlar
      if (PlacedRectangularY == All_lines[k].Y) {
        // Durum 1 tam oturursa
        if (
          PlacedRectangular.X == All_lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width ==
            All_lines[k].End_point_X
        ) {
          All_lines[k].Y = -100;
          PlacedRectangularY = PlacedRectangularY + 1;
          // Druum 2 sol tarafı kapalı sağ açık
        } else if (
          PlacedRectangular.X == All_lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width <
            All_lines[k].End_point_X
        ) {
          All_lines[k].Start_point_X =
            PlacedRectangular.X + PlacedRectangular.width;
          PlacedRectangularY = PlacedRectangularY + 1;
          // durum 3 sağ tarafı kapalı sol açık
        } else if (
          PlacedRectangular.X > All_lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width ==
            All_lines[k].End_point_X
        ) {
          All_lines[k].End_point_X = PlacedRectangular.X;
          PlacedRectangularY = PlacedRectangularY + 1;
          // durum 4 ortada her tarafı açıkta
        } else if (
          PlacedRectangular.X > All_lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width <
            All_lines[k].End_point_X
        ) {
          temp_End_point_X = All_lines[k].End_point_X;
          All_lines[k].End_point_X = PlacedRectangular.X;
          var CuttedLine = new All_line(
            PlacedRectangular.X + PlacedRectangular.width,
            temp_End_point_X,
            All_lines[k].Y
          );
          All_lines.push(CuttedLine);
          PlacedRectangularY = PlacedRectangularY + 1;
        }
      }
    }
  }
  DeletetheUnderLines(PlacedRectangular);
}
function DeletetheUnderLines(PlacedRectangular) {
  for (t = 0; t < PlacedRectangular.width + 1; t++) {
    for (f = 0; f < All_lines.length; f++) {
      if (PlacedRectangular.Y + PlacedRectangular.height < All_lines[f].Y) {
        // Durum 1 eğer line başlangııc aynı x de ise
        if (PlacedRectangular.X == All_lines[f].Start_point_X) {
          //Durum 1.1 bitiş noktası dikdörtgenin dışında  ise
          if (
            PlacedRectangular.X + PlacedRectangular.width <
            All_lines[f].Start_point_X
          ) {
            All_lines[f].Start_point_X =
              PlacedRectangular.X + PlacedRectangular.width;
          }
          //Durum 1.2 bitiş noktası içinde veya bitişte
          else {
            All_lines[f].Y = -10;
          }
        }
        // Durum 2 başlangıç dikdörtgenin içinde ise
        else if (
          All_lines[f].Start_point_X > PlacedRectangular.X &&
          All_lines[f].Start_point_X <
            PlacedRectangular.X + PlacedRectangular.width
        ) {
          //Durum 2.1 bitiş noktası dikdörtgenin dışında  ise
          if (
            PlacedRectangular.X + PlacedRectangular.width <
            All_lines[f].Start_point_X
          ) {
            All_lines[f].Start_point_X =
              PlacedRectangular.X + PlacedRectangular.width;
          }
          //Durum 2.2 bitiş noktası içinde veya bitişte
          else {
            All_lines[f].Y = -10;
          }
        }
      }
    }
  }
}

function getBestLine(Will_placed_Rectangular) {
  SortTheLines();
  for (i = 0; i < All_lines.length; i++) {
    if (
      Will_placed_Rectangular.width <=
      All_lines[i].End_point_X - All_lines[i].Start_point_X
    ) {
      Used_best_lines.push(All_lines[i]);
      console.log(JSON.parse(JSON.stringify(Used_best_lines)));
      return All_lines[i];
    }
  }
}
function SortTheLines() {
  All_lines.sort((a, b) => {
    if (a.Y == b.Y) {
      return a.Start_point_X - b.Start_point_X;
    }
    return b.Y - a.Y;
  });
}

class Rectangular {
  constructor(width, height, X, Y, id) {
    this.width = width;
    this.height = height;
    this.X = X;
    this.Y = Y;
    this.id = id;
  }
  show() {
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(this.X, this.Y, this.width, this.height);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(1);
    text(this.id, this.X + this.width / 2, this.Y + this.height / 2);
  }
}
class All_line {
  constructor(Start_point_X, End_point_X, Y) {
    this.Start_point_X = Start_point_X;
    this.End_point_X = End_point_X;
    this.Y = Y;
  }
}
