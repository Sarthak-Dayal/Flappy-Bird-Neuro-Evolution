// Matrix Class
class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (var i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  randomize() {

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2.0 - 1.0;
      }
    }
  }

  static transpose(matrix) {

    let result = new Matrix(matrix.cols, matrix.rows);

    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.cols; j++) {
        result.data[j][i] = matrix.data[i][j];
      }
    }
    return result;
  }

  add(n) {


    // Element-wise
    if (n instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    }

    // Scalar
    else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }

  static multiply(m1, m2) {
    if (m1.cols !== m2.rows) {
      console.log('Columns of A do not match rows of B.')
      return undefined;
    }

    let result = new Matrix(m1.rows, m2.cols);
    let a = m1.data;
    let b = m2.data;

    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        // Dot Product of values in col
        let sum = 0;
        for (var k = 0; k < m1.cols; k++) {
          sum += a[i][k] * b[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }

  multiply(n) {
    if(n instanceof Matrix) {

      // Element-wise
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }

    } else {
      // Scalar
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }

  static map(matrix, fn) {
    let result = new Matrix(matrix.rows, matrix.cols);
    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.cols; j++) {
        let val = matrix.data[i][j];
        result.data[i][j] = fn(val);
      }
    }
    return result;
  }

  map(fn) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = fn(val);
      }
    }
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (var i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  toArray() {
    let arr = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }
    let result = new Matrix(a.rows, a.cols);
    for (var i = 0; i < a.rows; i++) {
      for (var j = 0; j < a.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

}