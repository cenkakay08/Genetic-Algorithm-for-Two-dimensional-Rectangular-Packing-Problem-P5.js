// Function for shuffle array of packages id
function shuffleGenes(packageID) {
  for (let i = packageID.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [packageID[i], packageID[j]] = [packageID[j], packageID[i]];
  }

  return packageID;
}

class DNA {
  constructor(packageID) {
    this.genes = [];
    this.fitness = 0;
    let tempGenes = [];

    //used tempGenes to not shuffle initial array too
    tempGenes = [...packageID];
    this.genes = [...shuffleGenes(tempGenes)];
  }

  //Calculate Fitness Score
  calcFitness() {
    let score = EasyOrder(this.genes);
    this.fitness = score;
  }

  //Croosover
  crossover(partner) {
    //A new child
    let child = new DNA([...this.genes]); //because of we will change genes on later we can give any genes
    let crossoverRate = 0.25;

    for (let i = 0; i < int(this.genes.length * crossoverRate); i++) {
      let selectedGene = this.genes[i];
      let partnerLoc = partner.genes.findIndex((x) => x.id === selectedGene.id);

      [child.genes[partnerLoc], child.genes[i]] = [
        child.genes[i],
        child.genes[partnerLoc],
      ];
    }
    return child;
  }

  //Mutation
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        let randomGeneLoc = int(random(this.genes.length));

        [this.genes[randomGeneLoc], this.genes[i]] = [
          this.genes[i],
          this.genes[randomGeneLoc],
        ];
      }
    }
  }
}
