class Population {
  constructor(m, num, initialArray, stopCondition) {

    this.population; // Array to hold the current population
    this.matingPool; // ArrayList for mating pool
    this.generations = 0; // Number of generations
    this.finished = false; // Are we finished evolving?
    this.mutationRate = m; // Mutation rate
    this.perfectScore = 1;
    this.stopCondition = stopCondition;

    this.best;

    this.population = [];
    for (let i = 0; i < num; i++) {
      this.population[i] = new DNA(initialArray);
    }
    this.matingPool = [];
    this.calcFitness();
  }

  // Fitness Scores
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  }

  // Generate a mating pool
  naturalSelection() {
    this.matingPool = [];

    let maxFitness = this.population[0].fitness;
    for (let i = 0; i < this.population.length; i++) {
        
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }


    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); 

      for (let j = 0; j < n; j++) { 
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generate() {

    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);

      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;

    if(this.generations >= this.stopCondition) {
      this.isFinished = true;
    }
  }


  getBest() {
    return this.best;
  }

  evaluate() {
    let bestScore = 0;
    
    if(this.best !== undefined) {
      bestScore = this.best.fitness;
    }

    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > bestScore) {
        this.best = this.population[i];
      }
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;

    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }
}