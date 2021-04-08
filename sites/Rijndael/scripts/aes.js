
import { ByteMultiplier } from './byte-multipliers.js';

export const AesCipher = function(key) {
this.byteMultiplier = new ByteMultiplier(0x1b);
this.Nb = 4;

this.state = new Array(4).fill(new Array(this.Nb));
this.setKey = function(key) {
  // Creates a copy of key
  let settedKey = [];
  for (let i = 0; i < 4; i++) {
    settedKey.push(new Array(this.Nb));
  }
  
  for(let i = 0, k = 0; i < this.Nb; i++, k++) {
    for(let j = 0; j < 4; j++) {
      settedKey[j][i] = key[k];
    }
  }

  return settedKey;
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

