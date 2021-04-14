import { AesCipher as Aes } from './aes.js';
const defaultInitArray = new Array(16).fill(0);

/**
 * 
 * @param {number[]} initArray Vector de inicialización (16 bytes)
 */
export const AesCBC = function(initArray = defaultInitArray) {
  /**
   * Vector de inicialización
   */
  this.initArray = initArray;

  this.aes = new Aes();

  /**
   * 
   * @param {number[]} plainClearText Texto en claro (16 bytes)
   * @param {number[]} plainKey Clave (16 bytes)
   */
  this.cipher = function(plainClearText, plainKey) {

  };


}

const cbc = new AesCBC();