let Rectangulars = [];
let DeepCopyRect;
let copyPopulation;
let globalStack = 0;
//Genetic algorithm population
let population;
let GlobalScore = 0;
let divRectanguleQuantity;
let divStopCondition;
let divMutationRate;
let divPopulationQuantity;
let divRectWidth;
let divRectHeight;
let divCurrentGeneration;
let divAverageFitness;
let divBestFitness;
let divPopulationQuantityGenerations;
let divBoxHeight;
let currentBest;
let stats;
let isStarted = false;
let stopCondition;
let popmax;
let mutationRate;

let Y = -200;
let rectangularDrawIndex = 0;

let firstTimeDraw = false;
let isWait = false;

let waitTime = 100;

let animationCheckBox_value = false;

let randomCheckBox_value = true;
// Bin corner border value.
let Border_line_X = 800;
let startButton;

// Set number for quantity of random Rectangulars.
let Number_for_random_rectangulars = 100;

function setup() {
  Border_line_X = (windowWidth / 100) * 80;
  // Canvas created according to Window dimensions.
  createCanvas(windowWidth, windowHeight);
  // Create Rectangulars that has random height and width size.
  divRectanguleQuantity = createDiv("this is some text");
  divRectanguleQuantity.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divRectanguleQuantity.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 73
  );
  divStopCondition = createDiv("this is some text");
  divStopCondition.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divStopCondition.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 76
  );
  divMutationRate = createDiv("this is some text");
  divMutationRate.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divMutationRate.position((windowWidth / 100) * 80, (windowHeight / 100) * 79);
  divPopulationQuantity = createDiv("sdasdasd");
  divPopulationQuantity.style(
    "font-size",
    ((windowWidth / 100) * 0.95).toString() + "px"
  );
  divPopulationQuantity.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 82
  );
  divRectWidth = createDiv("sadasdasd");
  divRectWidth.style("font-size", ((windowWidth / 100) * 1).toString() + "px");
  divRectWidth.position((windowWidth / 100) * 82, (windowHeight / 100) * 40);
  divRectHeight = createDiv("sadasdasd");
  divRectHeight.style("font-size", ((windowWidth / 100) * 1).toString() + "px");
  divRectHeight.position((windowWidth / 100) * 82, (windowHeight / 100) * 45);
  divCurrentGeneration = createDiv("Current Generation:");
  divCurrentGeneration.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divCurrentGeneration.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 10
  );
  divAverageFitness = createDiv("Average Fitness:");
  divAverageFitness.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divAverageFitness.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 13
  );
  divBestFitness = createDiv("Best Fitness:");
  divBestFitness.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divBestFitness.position((windowWidth / 100) * 80, (windowHeight / 100) * 16);
  divPopulationQuantityGenerations = createDiv(
    "Population Quantity of Generations:"
  );
  divPopulationQuantityGenerations.style(
    "font-size",
    ((windowWidth / 100) * 1).toString() + "px"
  );
  divPopulationQuantityGenerations.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 19
  );
  divBoxHeight = createDiv("Height of the Bin:");
  divBoxHeight.style(
    "font-size",
    ((windowWidth / 100) * 1.2).toString() + "px"
  );
  divBoxHeight.position((windowWidth / 100) * 80, (windowHeight / 100) * 22);
  sliderRectWidth = createSlider(10, 200, 100);
  sliderRectWidth.position(
    (windowWidth / 100) * 89.5,
    (windowHeight / 100) * 40
  );
  sliderRectWidth.style("width", (windowWidth / 100) * 10 + "px");

  sliderRectHeight = createSlider(10, 200, 100);
  sliderRectHeight.position(
    (windowWidth / 100) * 89.5,
    (windowHeight / 100) * 45
  );
  sliderRectHeight.style("width", (windowWidth / 100) * 10 + "px");

  buttonAdd = createButton("Add");
  buttonAdd.position((windowWidth / 100) * 95, (windowHeight / 100) * 50);
  buttonAdd.mousePressed(() => createRectangular());

  buttonReset = createButton("Reset");
  buttonReset.position((windowWidth / 100) * 95, (windowHeight / 100) * 55);
  buttonReset.mousePressed(() => resetRectangulars());

  randomRectangularCheckBox = createCheckbox("Use Random Rectangles", true);
  randomRectangularCheckBox.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 90
  );
  randomRectangularCheckBox.changed(randomCheckBoxEvent);

  sliderPopulation = createSlider(10, 1000, 100);
  sliderPopulation.position(
    (windowWidth / 100) * 89.5,
    (windowHeight / 100) * 82
  );
  sliderPopulation.style("width", (windowWidth / 100) * 10 + "px");

  slidermutationRate = createSlider(1, 100, 1);
  slidermutationRate.position(
    (windowWidth / 100) * 89.5,
    (windowHeight / 100) * 79
  );
  slidermutationRate.style("width", (windowWidth / 100) * 10 + "px");

  sliderStopCondition = createSlider(100, 10000, 1000);
  sliderStopCondition.position(
    (windowWidth / 100) * 89.5,
    (windowHeight / 100) * 76
  );
  sliderStopCondition.style("width", (windowWidth / 100) * 10 + "px");

  sliderRectNumber = createSlider(100, 200, 150);
  sliderRectNumber.position(
    (windowWidth / 100) * 89.5,
    (windowHeight / 100) * 73.5
  );
  sliderRectNumber.style("width", (windowWidth / 100) * 10 + "px");

  startButton = createButton("Start");
  startButton.position((windowWidth / 100) * 95, (windowHeight / 100) * 95);
  startButton.mousePressed(() => start());

  animationCheckBox = createCheckbox("Activate the Animations", false);
  animationCheckBox.position(
    (windowWidth / 100) * 80,
    (windowHeight / 100) * 87
  );
  animationCheckBox.changed(checkBoxEvent);

  /* stats = createP("Stats");
  stats.position((windowWidth / 100) * 89.5, 50);
  stats.class("gen"); */
}

function draw() {
  // Background color
  //
  background("#E2F0FF");
  strokeWeight(1);
  if (population != undefined) {
    divCurrentGeneration.html(
      "Current Generation:" + population.getGenerations()
    );
    divAverageFitness.html(
      "Average Fitness:" + nf(population.getAverageFitness())
    );
    divBestFitness.html("Best Fitness:" + GlobalScore);
    divPopulationQuantityGenerations.html(
      "Population Quantity of Generations:" + population.getPopulationQuantity()
    );
    divBoxHeight.html(
      "Height of the Bin:" + (windowHeight - GlobalScore).toString()
    );
  }
  divRectanguleQuantity.html(
    "Rectangel Quantity:" + sliderRectNumber.value().toString()
  );
  divStopCondition.html(
    "Stop Condition: " + sliderStopCondition.value().toString()
  );
  divMutationRate.html(
    "Mutation Rate: " + (slidermutationRate.value() / 10).toString() + "%"
  );
  divPopulationQuantity.html(
    "Population Quantity:" + sliderPopulation.value().toString()
  );
  divRectWidth.html(("Width: " + sliderRectWidth.value()).toString());
  divRectHeight.html(("Height: " + sliderRectHeight.value()).toString());

  if (animationCheckBox_value) {
    animation();
  } else {
    noAnimation();
  }

  // Draw corner border line
  strokeWeight(1);
  line(Border_line_X, 0, Border_line_X, windowHeight);

  if (!firstTimeDraw && population !== undefined && !isWait) {
    genetic();
  }
  line(0, GlobalScore, Border_line_X, GlobalScore);
  strokeWeight(1);
  //displayInfo();

  /*  if (globalStack == stopCondition + 1) {
    //noLoop();
    globalStack = 0;
    GlobalScore = 0;
    //population = copyPopulation;
  } */

  // Generate mating pool
}
function start() {
  GlobalScore = 0;
  if (randomCheckBox_value) {
    randomRectangulars();
  }
  DeepCopyRect = Rectangulars.map((a) => Object.assign(new Rectangular(), a));
  population = new Population(
    slidermutationRate.value() / 100,
    sliderPopulation.value(),
    DeepCopyRect,
    sliderStopCondition.value()
  );

  rectangularDrawIndex = 0;
  firstTimeDraw = false;
  waitTime = 100;
  //copyPopulation = Object.assign({}, population);
  loop();
}
function genetic() {
  if (population.isFinished() == false) {
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
      firstTimeDraw = true;
    }
    globalStack++;
  }
}
function displayInfo() {
  let statstext = "";
  if (population !== undefined) {
    statstext =
      "current generations:     " + population.getGenerations() + "<br>";
    statstext +=
      "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "best fitness:       " + GlobalScore + "<br>";
    statstext +=
      "total population:      " + population.getPopulationQuantity() + "<br>";
    statstext += "mutation rate:         " + population.getMutationRate() + "%";
  }
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
  var Score = 9999;
  for (i = 0; i < RectangularsCopy.length; i++) {
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

function animation() {
  if (rectangularDrawIndex >= Rectangulars.length) {
    firstTimeDraw = false;
    rectangularDrawIndex = 0;
    isWait = true;
  }

  if (firstTimeDraw) {
    for (i = 0; i < rectangularDrawIndex; i++) {
      Rectangulars[i].show(Rectangulars[i].Y);
    }

    Rectangulars[rectangularDrawIndex].show(Y);

    Y = Y + 100;

    if (Y >= Rectangulars[rectangularDrawIndex].Y) {
      rectangularDrawIndex++;
      Y = 0;
    }
  } else {
    // Draw the all Rectangulars
    for (i = 0; i < Rectangulars.length; i++) {
      Rectangulars[i].show(Rectangulars[i].Y);
    }
  }

  if (!firstTimeDraw && isWait) {
    if (waitTime <= 0) {
      isWait = false;
      waitTime = 100;
    }
    waitTime--;
  }
}

function noAnimation() {
  if (firstTimeDraw) {
    if (waitTime <= 0) {
      firstTimeDraw = false;
      isWait = false;
      waitTime = 100;
    } else {
      isWait = true;
    }
    waitTime--;
  }
  for (i = 0; i < Rectangulars.length; i++) {
    Rectangulars[i].show(Rectangulars[i].Y);
  }
  if (!firstTimeDraw && isWait) {
    if (waitTime <= 0) {
      isWait = false;
      waitTime = 100;
    }
    waitTime--;
  }
}

function checkBoxEvent() {
  if (this.checked()) {
    animationCheckBox_value = true;
  } else {
    animationCheckBox_value = false;
  }
}
function randomCheckBoxEvent() {
  if (this.checked()) {
    randomCheckBox_value = true;
  } else {
    randomCheckBox_value = false;
  }
  handleStartButton();
}

function handleStartButton() {
  if (randomCheckBox_value || Rectangulars.length > 10) {
    startButton.removeAttribute("disabled");
  } else {
    startButton.attribute("disabled", "");
  }
}

function createRectangular() {
  Rectangulars.push(
    new Rectangular(
      Math.floor((sliderRectWidth.value() / 100) * ((windowWidth / 100) * 3)) +
        10,
      Math.floor(
        (sliderRectHeight.value() / 100) * ((windowHeight / 100) * 3)
      ) + 10,
      0,
      0,
      Rectangulars.length
    )
  );
  handleStartButton();
}

function randomRectangulars() {
  for (i = 0; i < sliderRectNumber.value(); i++) {
    Rectangulars[i] = new Rectangular(
      Math.floor(Math.random() * ((windowWidth / 100) * 7)) + 10,
      Math.floor(Math.random() * ((windowHeight / 100) * 7)) + 10,
      0,
      0,
      i
    );
  }
}

function resetRectangulars() {
  Rectangulars = [];
  handleStartButton();
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
  show(y) {
    stroke(0);
    strokeWeight(1);
    fill(this.color);
    rect(this.X, y, this.width, this.height);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(1);
    fill(color("black"));
    text(this.id, this.X + this.width / 2, y + this.height / 2);
  }
}
class All_line {
  constructor(Start_point_X, End_point_X, Y) {
    this.Start_point_X = Start_point_X;
    this.End_point_X = End_point_X;
    this.Y = Y;
  }
}
class SimpleRectangular {
  constructor(width, height, X, Y, id) {
    this.width = width;
    this.height = height;
    this.X = X;
    this.Y = Y;
    this.id = id;
  }
}

module.exports = { SimpleRectangular, All_line };
