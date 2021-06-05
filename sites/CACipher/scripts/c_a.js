

export const CA_Generator = function () {
  // Satellites IDs
  this.g2Taps = [[2, 6], [3, 7], [4, 8], [5, 9], [1, 9], [2, 10],
  [1, 8], [2, 9], [3, 10], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9],
  [1, 3], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [1, 6], [2, 7],
  [3, 8], [4, 9]].map((tuple) => [tuple[0] - 1, tuple[1] - 1]);

  // Constants polynomials
  this.g1 = [2, 9]; // 1 + x^3 + x^10
  this.g2 = [1, 2, 5, 7, 8, 9]; // 1 + x^2 + x^3 + x^6 + x^8 + x^9 + x^10

  /**
   * Generates CA code
   * @param {number} satID 
   * @param {number} length 
   * @returns {boolean[]} An 1's and 0's array of length 'length' containning
   * CA code generated
   */
  this.generate = (satID, length) => {
    this.log = [];
    let lfsr1 = new Array(10).fill(1);
    let lfsr2 = new Array(10).fill(1);

    let CA_Code = [];
    const prn1 = this.g2Taps[satID - 1];

    for (let i = 0; i < length; i++) {
      //Log object
      let loggy = {
        lfsr1: {
          state: [...lfsr1],
          feed: undefined
        },
        lfsr2: {
          state: [...lfsr2],
          feed: undefined
        },
        caSeq: undefined
      };

      // Code generation
      const caSeq = lfsr1[9] ^ lfsr2.xorElementsByIndex(prn1);
      CA_Code.push(caSeq)

      lfsr1.rotateNFeed(this.g1);
      lfsr2.rotateNFeed(this.g2);

      // Logging
      loggy.lfsr1.feed = lfsr1[0];
      loggy.lfsr2.feed = lfsr2[0];
      loggy.caSeq = caSeq;
      this.log.push(loggy);
    }



    return CA_Code;
  }



  /**
   * Returns a new array containning elements that
   * correspond with indexes in the invoking array.
   * @param {number[]} indexes 
   * @returns 
   */
  Array.prototype.getElementsByIndex = function (indexes) {
    let elements = [];
    indexes.forEach(index => {
      elements.push(this[index]);
    });

    return elements;
  }

  /**
   * Returns the result of applying xor to elements
   * that correspond with indexes
   * @param {number[]} indexes 
   * @returns 
   */
  Array.prototype.xorElementsByIndex = function (indexes) {
    return this.getElementsByIndex(indexes).reduce((xor, cur) => xor ^ cur);
  }

  /**
   * Rotates array to the right, feeding it back with the
   * result of applying xor to elements that correspond
   * with indexes
   * @param {number[]} indexes 
   */
  Array.prototype.rotateNFeed = function (indexes) {
    this.unshift(this.xorElementsByIndex(indexes));
    this.pop();
  }

  this.ej = function (its) {
    const poly = [3, 5, 7, 10].map((p) => p - 1);
    const lfsr = [1, 0, 0, 1, 0, 1, 0, 0, 0, 1];

    for (let i = 0; i < its; i++) {
      console.log('LFSR: ', lfsr, '  Salida: ', lfsr[9]);
      lfsr.rotateNFeed(poly);
      
    }

  }
  this.log = [];


  this.foo = function(seed, polynom) {
    // const lfsr = new Array.length(5).fill(0);
    const lfsr = [...seed];
    
    // polynom.forEacg(i => {
    //   lfsr[i] = 1;
    // });

    let result = [];
    for (let i = 0; i < 10; i++) {
      result.push(lfsr[4]);
      result.rotateNFeed(polynom);
    }

    return [lfsr, result];
  };
};

const caGen = new CA_Generator();
console.log(caGen.foo([1,0,0,0,0], [0, 3, 4]));
// console.log(caGen.generate(1, 14));
// console.log(caGen.log);

