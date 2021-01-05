// Definition of the Neural Network and how it works


function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {

  return y * (1 - y);

}

class NeuralNetwork {
  // Neural Network class constructor
  constructor(input_nodes, hidden_nodes, output_nodes) {
    if (input_nodes instanceof NeuralNetwork) {
      let a = input_nodes;
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();

      this.learning_rate = a.learning_rate;

    } else {
      this.input_nodes = input_nodes;
      this.hidden_nodes = hidden_nodes;
      this.output_nodes = output_nodes;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();

      this.learning_rate = 0.5;
    }
  }

  predict(input_array) {
    // Generate Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // Activation Function
    hidden.map(sigmoid);

    // Generate final output
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    
    // Activation
    output.map(sigmoid);

    // Convert outputs to array and return
    return output.toArray();

  }

  train(input_array, target_array) {
    // Generate Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // Activation Function
    hidden.map(sigmoid);

    // Generate final output
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    // Activation
    outputs.map(sigmoid);

    let targets = Matrix.fromArray(target_array);

    let output_errors = Matrix.subtract(targets, outputs);

    let weights_ho_t = Matrix.transpose(this.weights_ho);

    let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);

    // Calculate gradient
    let gradients = Matrix.map(outputs, dsigmoid);

    gradients.multiply(output_errors);

    gradients.multiply(this.learning_rate);

    // calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
    // Adjust weight by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust bias by gradients
    this.bias_o.add(gradients);

    // Calculate hidden gradient
    let hidden_gradients = Matrix.map(hidden, dsigmoid);
    //console.log(hidden_gradients);
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learning_rate);

    // Calculate hidden deltas
    let inputs_t = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradients, inputs_t);
    this.weights_ih.add(weight_ih_deltas);

    this.bias_h.add(hidden_gradients);

  }

  setLearningRate(n) {
    this.learning_rate = n;
  }

  // Adding function for neuro-evolution
  copy() {
    return new NeuralNetwork(this);
  }
  /*
  // Accept an arbitrary function for mutation
  mutate(func) {
    this.weights_ih.map(func);
    this.weights_ho.map(func);
    this.bias_h.map(func);
    this.bias_o.map(func);
  }
  */

  mutate(rate) {

    function mutate(val) {
      if (Math.random() < rate) {
        return val + randomGaussian(0, 0.1);
      } else {
        return val;
      }
    }
    
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}