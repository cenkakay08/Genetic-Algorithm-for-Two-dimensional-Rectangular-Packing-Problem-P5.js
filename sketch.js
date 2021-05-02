// EmptY arraY for Rectangulars.
let Rectangulars = [];

// Bin corner border value.
let Border_line_X = 800;

// Set number for quantity of random Rectangulars.
let Number_for_random_rectangulars = 100;

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

  stopCondition = 30;
  popmax = 10;
  mutationRate = 0.01;
  console.log(Rectangulars)

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax, Rectangulars, stopCondition);
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

  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    noLoop();
  }
}

// Function for resize Canvas according to Window dimensions.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function NewBottomLeftFunction(RectangelArrays) {
  var BinWidth = 600;
  var BinHeight = 800;
  var Lines = [];
  for (i = 0; i < BinHeight; i++) {
    Lines[i] = new All_line(0, BinWidth, i);
  }
  Lines = NewSortLines(Lines);
  for (z = 0; z < RectangelArrays.length; z++) {
    var bestLine = NewGetBestLine(RectangelArrays[z], Lines);
    RectangelArrays[z].X = bestLine.Start_point_X;
    RectangelArrays[z].Y = bestLine.Y - RectangelArrays[z].height;
    Lines = NewUpdateLines(RectangelArrays[z], Lines);
    Lines = NewSortLines(Lines);
  }
  Rectangulars = RectangelArrays;
  var Score = NewGetScore(RectangelArrays);
  return Score;
}
function NewGetScore(RectangelArrays) {
  var ratio = parseInt((RectangelArrays.length / 100) * 20);
  var Score = 9999;
  for (i = RectangelArrays.length - ratio; i < RectangelArrays.length; i++) {
    var tempScore = RectangelArrays[i].Y;
    if (tempScore < Score) {
      Score = tempScore;
    }
  }
  return Score;
}

function NewGetBestLine(Selected_Rect, Lines) {
  for (i = 0; i < Lines.length; i++) {
    if (Selected_Rect.width <= Lines[i].End_point_X - Lines[i].Start_point_X) {
      //console.log(JSON.parse(JSON.stringify(Used_best_lines)));
      return Lines[i];
    }
  }
}
function NewSortLines(Lines) {
  var SortedLines = Lines.sort((a, b) => {
    if (a.Y == b.Y) {
      return a.Start_point_X - b.Start_point_X;
    }
    return b.Y - a.Y;
  });
  return SortedLines;
}

function NewUpdateLines(PlacedRectangular, Lines) {
  var PlacedRectangularY = PlacedRectangular.Y;

  for (i = 0; i < PlacedRectangular.height + 1; i++) {
    for (k = 0; k < Lines.length; k++) {
      // Aynı y sırasında olanlar
      if (PlacedRectangularY == Lines[k].Y) {
        // Durum 1 tam oturursa
        if (
          PlacedRectangular.X == Lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width == Lines[k].End_point_X
        ) {
          Lines[k].Y = -100;
          PlacedRectangularY = PlacedRectangularY + 1;
          // Druum 2 sol tarafı kapalı sağ açık
        } else if (
          PlacedRectangular.X == Lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width < Lines[k].End_point_X
        ) {
          Lines[k].Start_point_X =
            PlacedRectangular.X + PlacedRectangular.width;
          PlacedRectangularY = PlacedRectangularY + 1;
          // durum 3 sağ tarafı kapalı sol açık
        } else if (
          PlacedRectangular.X > Lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width == Lines[k].End_point_X
        ) {
          Lines[k].End_point_X = PlacedRectangular.X;
          PlacedRectangularY = PlacedRectangularY + 1;
          // durum 4 ortada her tarafı açıkta
        } else if (
          PlacedRectangular.X > Lines[k].Start_point_X &&
          PlacedRectangular.X + PlacedRectangular.width < Lines[k].End_point_X
        ) {
          temp_End_point_X = Lines[k].End_point_X;
          Lines[k].End_point_X = PlacedRectangular.X;
          var CuttedLine = new All_line(
            PlacedRectangular.X + PlacedRectangular.width,
            temp_End_point_X,
            Lines[k].Y
          );
          Lines.push(CuttedLine);
          PlacedRectangularY = PlacedRectangularY + 1;
        }
      }
    }
  }
  Lines = NewDeleteUnderLines(PlacedRectangular, Lines);
  return Lines;
}

function NewDeleteUnderLines(PlacedRectangular, Lines) {
  for (t = 0; t < PlacedRectangular.width + 1; t++) {
    for (f = 0; f < Lines.length; f++) {
      if (PlacedRectangular.Y + PlacedRectangular.height < Lines[f].Y) {
        // Durum 1 eğer line başlangııc aynı x de ise
        if (PlacedRectangular.X == Lines[f].Start_point_X) {
          //Durum 1.1 bitiş noktası dikdörtgenin dışında  ise
          if (
            PlacedRectangular.X + PlacedRectangular.width <
            Lines[f].Start_point_X
          ) {
            Lines[f].Start_point_X =
              PlacedRectangular.X + PlacedRectangular.width;
          }
          //Durum 1.2 bitiş noktası içinde veya bitişte
          else {
            Lines[f].Y = -10;
          }
        }
        // Durum 2 başlangıç dikdörtgenin içinde ise
        else if (
          Lines[f].Start_point_X > PlacedRectangular.X &&
          Lines[f].Start_point_X < PlacedRectangular.X + PlacedRectangular.width
        ) {
          //Durum 2.1 bitiş noktası dikdörtgenin dışında  ise
          if (
            PlacedRectangular.X + PlacedRectangular.width <
            Lines[f].Start_point_X
          ) {
            Lines[f].Start_point_X =
              PlacedRectangular.X + PlacedRectangular.width;
          }
          //Durum 2.2 bitiş noktası içinde veya bitişte
          else {
            Lines[f].Y = -10;
          }
        }
      }
    }
  }
  return Lines;
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
