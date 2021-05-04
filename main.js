function geneticAlgorithm(packageID) {
  target = [1, 2, 3, 4, 5, 6];
  popmax = 100;
  mutationRate = 0.01;
  let initial = [2, 5, 6, 4, 1, 3];

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax, initial);

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
