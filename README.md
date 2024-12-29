# Flappy Bird Neuroevolution
A demonstration of neuro-evolution using the game Flappy Bird written in p5.js using a custom genetic algorithm and machine learning library inspired by [The Coding Train](https://thecodingtrain.com/).

<img width="1710" alt="image" src="https://github.com/user-attachments/assets/69d787ae-4033-4164-9f97-d286eea679c2" />


## Usage

In order to use this project, [go here](https://sarthak-dayal.github.io/Flappy-Bird-Neuro-Evolution/). The speed of the game (and the training) can be changed by adjusting the slider.

## Methods
This program uses the ideas of genetic algorithms and matrix-based neural networks in order to achieve the process of neuro-evolution. The program begins with 500 different birds initialized with separate "brains" which are randomized Neural Networks. The "brains" output whether or not a bird jumps at a given frame in the game. If the bird decides not to jump, it is pulled down by gravity each frame. As the game progresses, every bird is assigned a fitness score based on how far the bird made it in the game and this fitness score is used to determine the probability that the bird will progress on to the next generation. Each progressing bird's brain is then tweaked at a 10% probability to add some small mutations in order to simulate a real evolutionary environment. Through generations, the birds get better and better at the game and, in most cases, eventually master it.
