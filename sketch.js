// EmptY arraY for Rectangulars.
let Rectangulars = [];
let DeepCopyRect;
let copyPopulation;
let globalStack = 0;
let currentBest;
//Genetic algorithm population
let population;
let GlobalScore = 0;
let stats;
let isStarted = false;
let stopCondition;
let popmax;
let mutationRate;

// Bin corner border value.
let Border_line_X = 800;

// Set number for quantity of random Rectangulars.
let Number_for_random_rectangulars = 75;

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
  DeepCopyRect = Rectangulars.map((a) => Object.assign(new Rectangular(), a));

  sliderPopulation = createSlider(0, 360, 60, 40);
  sliderPopulation.position(400, 400);
  sliderPopulation.style("width", "80px");

  button = createButton("Start");
  button.position(100, 100);
  button.mousePressed(() => start());

  stats = createP("Stats");
  stats.position(1000, 50);
  stats.class("gen");

  stopCondition = 1000;
  popmax = 100;
  mutationRate = 0.01;
  noLoop();
  // Create a population with a target phrase, mutation rate, and population max
}

function draw() {
  // Background color
  //
  background("#E2F0FF");

  // Draw the all Rectangulars
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show();
  }

  // Draw corner border line
  strokeWeight(1);
  line(Border_line_X, 0, Border_line_X, windowHeight);
  displayInfo();

  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();
  currentBest = EasyOrder(population.getBest());
  if (currentBest > GlobalScore) {
    GlobalScore = currentBest;

    Rectangulars = population
      .getBest()
      .map((a) => Object.assign(new Rectangular(), a));

    //animation
  }
  /*  if (population.isFinished()) {
    console.log("buraya ulaştım");
    noLoop();
  } */
  globalStack++;
  line(0, GlobalScore, Border_line_X, GlobalScore);
  strokeWeight(1);
  if (globalStack == stopCondition + 1) {
    noLoop();
    globalStack = 0;
    GlobalScore = 0;
    //population = copyPopulation;
  }

  // Generate mating pool
}
function start() {
  population = new Population(
    mutationRate,
    popmax,
    DeepCopyRect,
    stopCondition
  );
  //copyPopulation = Object.assign({}, population);
  loop();
}
function displayInfo() {
  let statstext =
    "total generations:     " + population.getGenerations() + "<br>";
  statstext +=
    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);
}

// Function for resize Canvas according to Window dimensions.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function NewBottomLeftFunction(RectangelArrays) {
  var BinWidth = Border_line_X;
  var BinHeight = windowHeight;
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

function EasyOrder(RectangularsCopy) {
  var PlacementY = windowHeight;
  var PlacementX = 0;
  var BinWidth = Border_line_X;
  var HeightsRectangularY = 0;
  for (i = 0; i < RectangularsCopy.length; i++) {
    if (PlacementX + RectangularsCopy[i].width <= BinWidth) {
      RectangularsCopy[i].X = PlacementX;
      RectangularsCopy[i].Y = PlacementY - RectangularsCopy[i].height;
      PlacementX = RectangularsCopy[i].width + PlacementX;
      if (RectangularsCopy[i].height > HeightsRectangularY) {
        HeightsRectangularY = RectangularsCopy[i].height;
      }
    } else {
      PlacementX = 0;
      PlacementY = PlacementY - HeightsRectangularY;
      RectangularsCopy[i].X = PlacementX;
      RectangularsCopy[i].Y = PlacementY - RectangularsCopy[i].height;
      PlacementX = RectangularsCopy[i].width + PlacementX;
      HeightsRectangularY = RectangularsCopy[i].height;
    }
  }
  var ratio = parseInt((RectangularsCopy.length / 100) * 20);
  var Score = 9999;
  for (i = RectangularsCopy.length - ratio; i < RectangularsCopy.length; i++) {
    var tempScore = RectangularsCopy[i].Y;
    if (tempScore < Score) {
      Score = tempScore;
    }
  }

  // shuffleArray(RectangularsCopy);
  // Alttaki satırı silince ekranda gösterilen dikdörtgenler sonuca göre çizdirilir.
  // Rectangulars = RectangularsCopy;

  return Score;
}

class Rectangular {
  constructor(width, height, X, Y, id) {
    this.width = width;
    this.height = height;
    this.X = X;
    this.Y = Y;
    this.id = id;
    this.color = color(
      Math.floor(Math.random() * 205) + 50,
      Math.floor(Math.random() * 205) + 50,
      Math.floor(Math.random() * 205) + 50
    );
  }
  show() {
    stroke(0);
    strokeWeight(1);
    fill(this.color);
    rect(this.X, this.Y, this.width, this.height);
    textAlign(CENTER, CENTER);
    fill(color("black"));
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
