function geneticAlgorithm(packageID) {
  stopCondition = 10;
  popmax = 100;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax, initial, stopCondition);

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