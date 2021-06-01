const TOTAL = 500;
let generation = 1;
let birds = [];
let pipes = [];
let savedBirds = [];
let counter = 0;
let slider;
let score = 0;
let generationHTML;
let scoreHTML;
let speedHTML;
let aliveHTML;
let birdImage;
let bg;
let ground;
let pipe;

function preload() {
  birdImage = loadImage("assets/bird.png");
  bg = loadImage("assets/background.png");
  ground = loadImage("assets/ground.png");
  bot_pipe = loadImage("assets/pipe_bottom.png");
  top_pipe = loadImage("assets/pipe_top.png");
}

function setup() {

  slider = createSlider(1, 10, 1);

  speedHTML = createP('Speed: ' + slider.value() + 'x');  
  speedHTML.id("speed");

  generationHTML = createP('Generation: ' + generation);
  generationHTML.id("generation");

  aliveHTML = createP('# of Birds: ' + birds.length);
  aliveHTML.id("alive");

  scoreHTML = createP('Score: ' + score);
  scoreHTML.id("score");

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird(birdImage);
  }
  createCanvas(windowWidth , windowWidth * 0.4);

}

function draw() { 
  for (let i = 0; i < slider.value(); i++) {
    speedHTML.html('Speed: ' + slider.value() + 'x');
    aliveHTML.html('Alive: ' + birds.length);
    if (counter % 75 == 0) {
      pipes.push(new Pipe(top_pipe, bot_pipe));
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
        score++;
        scoreHTML.html('Score: ' + score);
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
      score = 0;
      scoreHTML.html('Score: ' + score);
      generation++;
      generationHTML.html('Generation: ' + generation);
      pipes = [];
    }
  }
  background(bg);
  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }

  image(ground, 0, height-0.05*height);
  

}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth * 0.4);
}