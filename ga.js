// Genetic Algorithm

function nextGen() {
  console.log("Next Generation");

  calculateFitness();

  for (let i = 0; i<TOTAL; i++) {
    birds[i] = pickOne();
  }
}

function calculateFitness() {
  let sum = 0;
  for(let bird of savedBirds) {
    sum+=bird.score;
  }
  for(let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}