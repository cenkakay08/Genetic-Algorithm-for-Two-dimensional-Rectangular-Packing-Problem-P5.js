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
        this.genes=[...shuffleGenes(tempGenes)];
    }

    //Calculate Fitness Score
    calcFitness(target) {
        let score = 0;

        for (let i = 0; i < this.genes.length; i++) {

            if(this.genes[i] == target[i]) {
                score++;
            }
        }

        this.fitness = score / target.length;
    }

    //Croosover
    crossover(partner) {
        //A new child
        let child = new DNA(this.genes);//because of we will change genes on later we can give any genes
        child.genes = [...this.genes];
        let crossoverRate = 0.25;

        for (let i = 0; i < int(this.genes.length * crossoverRate); i++) {
            let selectedGene = this.genes[i];
            let partnerLoc = partner.genes.indexOf(selectedGene);
            let targetLocationGene = this.genes[partnerLoc];

            child.genes[partnerLoc] = selectedGene;
            child.genes[i] = targetLocationGene; 
        }
        return child;
    }

    //Mutation
    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < mutationRate) {
                let selectedGene = this.genes[i];
                let randomGeneLoc = int(random(this.genes.length));
                let randomGene = this.genes[randomGeneLoc];
    
                this.genes[i] = randomGene;
                this.genes[randomGeneLoc] = selectedGene;
            }
          }
    }
}