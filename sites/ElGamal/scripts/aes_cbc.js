import { AesCipher as Aes } from './aes.js';
import { xorArrays, splitArray, fillWith, toMatrix, transposeMatrix } from './utilities.js';

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

  // Objeto para loggear info en la página
  this.log = [];

  this.aes = new Aes();

  /**
   * Verifica si el vector tiene menos de 16 bytes
   * @param {number[]} clearTextBlock 
   * @returns 
   */
  this.isBlockIncomplete = function(block) {
    return block.length < 16;
  }

  /**
   * Devuelve un objeto resultante de completar incompleteBlock con elementos de cipheredBlock hasta alcanzar un tamaño de 16
   * Ejemplo:
   *  incompleteBlock = 0, 1, 2, 3
   *  cipheredBlock = 15, 14, 13, 12, 11, 10, 9 , 8, 7, 6, 5, 4, 3, 2, 1, 0
   *  resultado = 0, 1, 2, 3, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
   * @param  incompleteBlock 
   * @param  cipheredBlock 
   * @returns 
   */
  this.completeBlock = function(incompleteBlock, cipheredBlock) {
    const completeBlock = [...incompleteBlock];
    let lastIndex = completeBlock.length;
    while(completeBlock.length < 16) {
      completeBlock.push(cipheredBlock[lastIndex++]);
    }

    return completeBlock;
  }


  /**
   * 
   * @param {number[]} plainClearText Texto en claro (16 bytes)
   * @param {number[]} plainKey Clave (16 bytes)
   */
  this.cipher = function(plainClearText, plainKey) {
    
    // Logging
    this.log = {input : {key: [], iv: [], blocks: []}, output: {blocks: []}};
    this.log.input.key = [...plainKey];
    this.log.input.iv = [...this.initArray];

    // Divido el texto en bloques de 16 bytes o menos
    const clearTextBlocks = splitArray(plainClearText, 16);

    // Logging
    this.log.input.blocks = clearTextBlocks.map(block => [...block]);

    const cipheredBlocks = [];

    // Resultado de hacer XOR entre el VI y el texto en claro
    const xorResult = xorArrays(this.initArray, clearTextBlocks[0]);
    // Introducimos el primer bloque cifrado
    cipheredBlocks.push(this.aes.cipher(plainKey, xorResult));
    
    let cipheredBlock = [];
    // Ciframos todos los bloques
    for (let i = 1; i < clearTextBlocks.length; i++) {
      
      // Manejamos el caso de que el mensaje no sea mútliplo de 16
      if (this.isBlockIncomplete(clearTextBlocks[i])) {
        const lastBlock = [...cipheredBlocks[i - 1]].splice(0, clearTextBlocks[i].length);
        const xorResult =  xorArrays(cipheredBlocks[i - 1], fillWith(clearTextBlocks[i], 0, 16));
        const completedXorResult = this.completeBlock(xorResult, cipheredBlocks[i]);
        cipheredBlocks[i - 1] = this.aes.cipher(plainKey, completedXorResult);
        cipheredBlocks.push(lastBlock);
      } else {
        cipheredBlock = this.aes.cipher(plainKey, xorArrays(clearTextBlocks[i], cipheredBlocks[i - 1]));
        cipheredBlocks.push(cipheredBlock);
      }

    }

    // Logging
    this.log.output.blocks = cipheredBlocks.map(block => [...block]);

    return cipheredBlocks.flat(1);
  };


}

const cbc = new AesCBC();
const key = [
  0x00, 0x01, 0x02,  0x03,
  0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0A, 0x0B, 
  0x0C, 0x0D, 0x0E, 0x0F,
];

const zeroKey = new Array(16).fill(0);

const msg = [
  0x00, 0x11, 0x22, 0x33,  
  0x44, 0x55, 0x66, 0x77,
  0x88, 0x99, 0xAA, 0xBB,
  0xCC, 0xDD, 0xEE, 0xFF, 0xaa
];

// const ciphered = cbc.cipher(msg, key).map(b => `0x${b.toString(16).padStart(2, '0')}`);
// // console.log(ciphered);

// const matrix = toMatrix(msg, msg.length / 4, 4);
// console.log('TOMATRIx', matrix.map(row => row.map(b=>b.toString(16))));

// const transposed = transposeMatrix(matrix);
// console.log('TRANSPOSED:', transposed.map(row => row.map(b => b.toString(16))));