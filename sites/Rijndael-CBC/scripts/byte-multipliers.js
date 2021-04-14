
export const MainLog = function() {
  this.factors = [];
  this.results = [];
};


export const ByteMultiplier = function(algorithmByte) {
  this.algorithmByte = algorithmByte;
  this.mainLog = new MainLog();
  this.subLog = [];
  

  /**
   * Performs byte multiplication using algorithmByte
   * @param {number} byteA_ 
   * @param {number} byteB_ 
   * @return {number} multiplication of two bytes
   */
  this.multiply = function(byteA_, byteB_) {
    
    // Logging
    this.mainLog = new MainLog();
    this.subLog = [];

    // Decomposing into factors
    const factors = this.decomposeByte(byteB_);

    // Logging
    this.mainLog.factors = [...factors];

    // Calculating product
    let result = 0;
    for (let i = 0; i < factors.length; i++) {
      const subMult = this.multiplyByFactor(byteA_, factors[i]);
      this.mainLog.results.push(subMult);
      result ^= subMult;
    }

    return result;
  };

  /**
   * Decompose a byte into it's factors
   * @param {number} byte_ 
   * @return {Array<number>}
   */
  this.decomposeByte = function(byte_) {
    const factors = [];
    byte_.toByteBits().forEach((bit, index) => {
      if (bit === 1) {
        const factor = new Array(8).fill(0);
        factor[index] = 1;
        factors.unshift(factor);
      }
    });
    return factors.map((f) => f.toByte());
  };

  /**
   * Performs a multiplication between byte_ and factor_. 
   * @param {number} byte_ 
   * @param {number} factor_ A byte with only one 1.
   * @return {number}
   */
  this.multiplyByFactor = function(byte_, factor_) {
    if (factor_ === 1) {
      return byte_;
    }

    let byte = byte_.toByteBits();
    const factor = factor_.toByteBits();

    const oneIndex = 7 - factor.indexOf(1);

    // Logging
    const factorLog = [byte_.toByteBits().join('')];

    for (let i = 0; i < oneIndex; i++) {
      if (byte[0] === 1) {
        byte.rotateLeft();

        // Logging
        let resultLog = `${byte.join('')} + ${algorithmByte.toByteBits().join('')} = `;


        byte = this.xorByteBits(byte, algorithmByte.toByteBits());

        resultLog += `${byte.join('')}`;

        // Logging
        factorLog.push({operation: 'rotate & add', result: resultLog});
      } else {
        byte.rotateLeft();

        // Logging
        factorLog.push({operation: 'rotate', result: byte.join('')});
      }
    }

    // Logging
    this.subLog.push(factorLog);

    return byte.toByte();
  };

  /**
   * Performs a xor operation bettween two Arrays<1 | 0> of length 8 and returns the result
   * @param {Array<1|0>} byteBitsA 
   * @param {Array<1|0>} byteBitsB 
   * @return {Array<1|0>} Result of xor operation between byteBitsA and byteBitsB
   */
  this.xorByteBits = function(byteBitsA, byteBitsB) {
    const byteA = parseInt(byteBitsA.join(''), 2);
    const byteB = parseInt(byteBitsB.join(''), 2);

    return (byteA ^ byteB).toByteBits();
  };

  /**
   * Converts the less significant byte of a number into 
   * an array of length 8 containning it's bits.
   * @return {Array<1 | 0>} 0's and 1's array of length 8.
   */
  Number.prototype.toByteBits = function() {
    const result = this & 0xff;
    return result.toString(2).padStart(8, '0').split('').map((b) => parseInt(b));
  };

  /**
   * Converts an array of length 8 containning 1's and 0's to a byte.
   * @return {number}
   */
  Array.prototype.toByte = function () {
    return parseInt(this.join(''), 2);
  };


  /**
   * Rotates the invocant array to left using rightFeedBack
   * @param {1 | 0} rightFeedBack 
   */
  Array.prototype.rotateLeft = function(rightFeedBack = 0) {
    this.shift();
    this.push(rightFeedBack);
  };

};

