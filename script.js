const TOTAL = 1000;
const CYCLES = 100;
let generation = 0;
let birds = [];
let pipes = [];
let savedBirds = [];
let counter = 0;
let slider;
let pipespassed =0;

function keyPressed() {
  if(key === 'S') {
    let bird = birds[0];
    let json = JSON.stringify(bird.brain);
    saveJson(bird.brain, 'bird.json');
  }
}


function setup() {
  slider = createSlider(1, 100, 1);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  createCanvas(640, 480);

  pipes.push(new Pipe());
}

function draw() {
  //console.log(frameCount);
  for (let i = 0; i < slider.value(); i++) {

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }


      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        pipespassed++;
        console.log("Pipes Passed: "+ pipespassed);
      }
    }
    for (let j = birds.length - 1; j >= 0; j--) {
        if (birds[j].offscreen()) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
    }
    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
      bird.show();
    }
    if (birds.length == 0) {
      counter = 0;
      nextGen();
      pipespassed = 0;
      generation++;
      console.log("Generation: " + generation);
      pipes = [];
    }
  }
  background(0);
  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }
  

}

