
import { ByteMultiplier } from './byte-multipliers.js';

export const AesCipher = function(key) {
this.byteMultiplier = new ByteMultiplier(0x1b);
this.Nb = 4;

this.state = new Array(4).fill(new Array(this.Nb));

/**
 * Receives a Number[] representing the initial text
 * @param {Number[]} key 
 * @returns A Number[][] square matrix taking input as columns. For example:
 * Input: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
 * Output: [
 *           [0, 4, 8,  12], 
 *           [1, 5, 9,  13],
 *           [2, 6, 10, 14],
 *           [3, 7, 11, 15],
 *         ]
 */
this.setKey = function(key) {
  // Creates a copy of key
  let settedKey = [];
  for (let i = 0, k = 0; i < 4; i++) {
    settedKey.push([]);
    for (let j = 0; j < this.Nb; j++) {
      settedKey[i].push(key[k++])
    }
  }
  this.transposeMatrix(settedKey);
  return settedKey;
}

/**
 * Receives a matrix and transposes it inplace
 * @param  matrix 
 */
this.transposeMatrix = function(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i < j) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;  
      }
    }
  }
}


this.key = [];
// this.key = this.setKey(key);
/**
 * 00 01 02 03
 * 10 11 12 13
 * 20 21 22 23
 * 30 31 32 33
 */

this.AddRoundKey = function(initialText) {

};


};

