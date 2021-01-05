p5.disableFriendlyErrors = true;
const TOTAL = 250;
const CYCLES = 100;
let generation = 1;
let birds = [];
let pipes = [];
let savedBirds = [];
let counter = 0;
let slider;
let pipespassed = 0;
let generationHTML;
let pipespassedHTML;
let speedHTML;
let numBirdsHTML;
let birdImage;

function preload() {
  birdImage = loadImage("bird.png");
}

function setup() {

  slider = createSlider(1, 10, 1);

  speedHTML = createP('Speed: ' + slider.value() + 'x');
  speedHTML.style('font-family', 'verdana');

  generationHTML = createP('Generation: ' + generation);
  generationHTML.style('font-family', 'verdana');

  numBirdsHTML = createP('# of Birds: ' + birds.length);

  pipespassedHTML = createP('Pipes Passed: ' + pipespassed);
  pipespassedHTML.style('font-family', 'verdana');

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird(birdImage);
  }
  createCanvas(windowWidth - windowWidth / 100, 480);

}

function draw() { 
  for (let i = 0; i < slider.value(); i++) {
    speedHTML.html('Speed: ' + slider.value() + 'x');
    numBirdsHTML.html('# of Birds: ' + birds.length);
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
        pipespassedHTML.html('Pipes Passed: ' + pipespassed);
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
      pipespassedHTML.html('Pipes Passed: ' + pipespassed);
      generation++;
      generationHTML.html('Generation: ' + generation);
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

