/**
 * @module ChaCha20
 */

/**
 * ChaCha20 cipher implementation
 */
export function ChaCha20() {
  this.state = 0;
  this.ROUNDS = 20;
  this.rotl = function(a, b) {
    const arr = new Uint32Array(4);
    arr[0] = a;
    arr[1] = b;
    arr[2] = arr[0] << arr[1];
    arr[3] = arr[0] >>> (32 - arr[1]);
    arr[0] = arr[2] | arr[3];
    return arr[0];
  };

  /**
   * Performs quarter round operation on a, b, c, d objects
   * of the shape {value: x} where x is an 32 bit unsigned integer
   * @param {{value: x}} a 
   * @param {{value: x}} b 
   * @param {{value: x}} c 
   * @param {{value: x}} d 
   */
  this.quarterRound = function(a, b, c, d) {
    const arr = new Uint32Array(10);
    arr[0] = a.value;
    arr[1] = b.value;
    arr[2] = c.value;
    arr[3] = d.value;

    arr[0] = arr[0] + arr[1]; arr[3] = arr[3] ^ arr[0]; arr[3] = this.rotl(arr[3], 16);
    arr[2] = arr[2] + arr[3]; arr[1] = arr[1] ^ arr[2]; arr[1] = this.rotl(arr[1], 12);
    arr[0] = arr[0] + arr[1]; arr[3] = arr[3] ^ arr[0]; arr[3] = this.rotl(arr[3], 8);
    arr[2] = arr[2] + arr[3]; arr[1] = arr[1] ^ arr[2]; arr[1] = this.rotl(arr[1], 7);

    a.value = arr[0];
    b.value = arr[1];
    c.value = arr[2];
    d.value = arr[3];
  };

  /**
   * Applies quarter round to a_, b_, c_, and d_ indexes
   * of arr. Being arr a Uint32Array.
   * @param {Uint32Array} arr 
   * @param {number} a_ 
   * @param {number} b_ 
   * @param {number} c_ 
   * @param {number} d_ 
   */
  this.applyQR = function(arr, a_, b_, c_, d_) {
    const a = {value: arr[a_]};
    const b = {value: arr[b_]};
    const c = {value: arr[c_]};
    const d = {value: arr[d_]};

    this.quarterRound(a, b, c, d);

    arr[a_] = a.value;
    arr[b_] = b.value;
    arr[c_] = c.value;
    arr[d_] = d.value;
  };

  /**
   * Performs this.ROUND iterations applying the
   * ChaCha20 quarter round operation over current state.
   * @returns {Uint32Array} 
   */
  this.chachaBlock = function() {
    let input = this.state;
    let i;
    const x = new Uint32Array(16);
    x.forEach((val, index) => x[index] = input[index]);

    for (i = 0; i < this.ROUNDS; i += 2) {
      this.applyQR(x, 0, 4, 8, 12);
      this.applyQR(x, 1, 5, 9, 13);
      this.applyQR(x, 2, 6, 10, 14);
      this.applyQR(x, 3, 7, 11, 15);

      this.applyQR(x, 0, 5, 10, 15);
      this.applyQR(x, 1, 6, 11, 12);
      this.applyQR(x, 2, 7, 8, 13);
      this.applyQR(x, 3, 4, 9, 14);
    }

    this.updateState(x);

    const output = [];
    for (i = 0; i < 16; i++) {
      output.push((x[i] + input[i]) % Math.pow(2, 32));
    }
    return output;
  };

  /**
   * Updates chacha state, converting a Uint32Array to a standard
   * number array.
   * @param {Uint32Array} newState 
   */
  this.updateState = function(newState) {
    this.state = [];
    newState.forEach((val) => this.state.push(val));
  }
};

