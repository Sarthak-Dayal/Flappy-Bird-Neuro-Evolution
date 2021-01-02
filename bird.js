function mutation(x) {
  let num = random(1);
  if(num < 0.05){
    return random(1);  
  } else {
    return x;
  }
}

//Code Taken from The Coding Train
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 16, 2);
    }
    this.score = 0;
    this.fitness;
  }
  show() {
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, 32, 32);
  };

  up() {
    this.velocity += this.lift;
  };

  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;
    this.score++;
  };


  think(pipes) {

    // Find the closes pipe
    let closest = null;
    let closestD = Infinity;

    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x  + pipes[i].w - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.up();
    }
  }
  mutate() {
    this.brain.mutate(0.1);
  }

  offscreen() {
    return this.y > height || this.y < 0;
  }

}
