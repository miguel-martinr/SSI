import { InverseOf, fastModularExponentiation, lehmanPeraltaTest } from './utilities.js';

const alphabet = {
  'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12,
  'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
};

// const alphabet = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9};


export const RSA = function(base = 26, alph = alphabet) {
  // Logging
  this.log = [];

  // Base en la que está el mensaje
  this.base = base;

  // Alfabeto
  this.alph = alphabet;

  /**
   * Calcula el tamaño de los bloques
   * @param {number} base base en la que se quiere codificar el mensaje
   * @param {number} n módulo
   */
  this.getBlockSize = function(base, n) {
    return (Math.log(n) / Math.log(base)) | 0;
  };

  /**
   * Devuelve el bloque codificado
   * @param {string} block 
   * @returns {number} Bloque codificado
   */
  this.encodeBlock = function(block) {

    const alphLength = Object.values(this.alph).length;
    const codifiedChars = block.split('').map((c, i) => {
      const temp1 = this.alph[c];
      const temp2 = Math.pow(alphLength, block.length - 1 - i);
      const codifiedChar = temp1 * temp2;
      return codifiedChar;
    });

    return codifiedChars.reduce((total, cur) => total + cur);
  };

  /**
  * Devuelve el bloque decodificado
  * @param {number} block 
  * @returns {string} bloque decodificado
  */
  this.decodeBlock = function(block) {
    const alphKeys = Object.keys(this.alph);
    return block.toString(26).split('').map((c) => alphKeys[parseInt(c, alphKeys.length)]).join('');
  };


  /**
   * Divide el mensaje en bloques de tamaño blockSize
   * @param {string} msg 
   * @param {number} blockSize 
   * @returns {string[]} Array con el mensaje separado en bloques
   */
  this.splitMessage = function(msg, blockSize) {
    const splittedMessage = [];
    const msgChars = msg.toUpperCase().split('').filter((c) => Object.keys(this.alph).includes(c));
    const numOfChars = msgChars.length;

    for (let i = 0; i < numOfChars / blockSize; i++) {
      splittedMessage.push(msgChars.splice(0, blockSize).join(''));
    }

    return splittedMessage;
  };

  /**
   * Cifra un bloque codificado en decimal
   * @param {number} block Bloque a cifrar (en decimal)
   * @param {number} e 
   * @param {number} n 
   * @returns 
   */
  this.cipherBlock = function(block, e, n) {
    return fastModularExponentiation(block, e, n);
  };


  /**
   * Descifra un bloque (en decimal)
   * @param {number} block 
   * @param {number} d Entero primo con fi(n)
   * @param {number} n Módulo
   * @returns 
   */
  this.decipherBlock = function(block, d, n) {
    return fastModularExponentiation(block, d, n);
  };

  /**
   * Cifra un mensaje
   * @param {string} clearText Texto en claro
   * @param {number} p Número primo
   * @param {number} q Número primo
   * @param {number} d Entero primo con fi(n)
   * @returns 
   */
  this.cipher = function(clearText, p, q, d) {
    // Logging
    this.log = {
      inParams: { p: p, q: q, d: d },
      outParams: undefined,
      splittedBlocks: undefined,
      encodedBlocks: undefined,
      cipheredBlocks: undefined,
    };

    // Verificar que p y q son números primos con el test de primalidad de Lehman y Peralta
    if (!lehmanPeraltaTest(p)) {
      alert(`Error: ${p} no es primo`);
      return;
    }

    if (!lehmanPeraltaTest(q)) {
      alert(`Error: ${q} no es primo`);
      return;
    }

    const n = p * q;
    const fiN = (p - 1) * (q - 1);
    const e = new InverseOf(d).module(fiN);

    const blockSize = this.getBlockSize(this.base, n);

    const splittedBlocks = this.splitMessage(clearText, blockSize).map((block) => block);
    const encodedBlocks = splittedBlocks.map((block) => this.encodeBlock(block));
    const cipheredBlocks = encodedBlocks.map((block) => this.cipherBlock(block, e, n));
    const decipheredMsg = cipheredBlocks.map((block) => this.decipherBlock(block, d, n));

    const decodedMsg = decipheredMsg.map((block) => this.decodeBlock(block)).join('');

    // Logging
    this.log.outParams = { fiN: fiN, e: e, n: n };
    this.log.splittedBlocks = splittedBlocks;
    this.log.encodedBlocks = encodedBlocks;
    this.log.cipheredBlocks = cipheredBlocks;

    console.log(`Se comprueba que p y q son primos \n` +
        `Se comprueba que d es primo con fi(n) = ${fiN}\n` +
        `Se calcula e = ${e}\n` +
        `Como n = ${n}, se divide el texto en bloques de ${blockSize} caracteres\n` +
        `Se pasa cada bloque a decimal para poder cifrar, obteniendo ${encodedBlocks.join(', ')}\n` +
        `Se calcula en decimal el texto cifrado: ${cipheredBlocks}\n` +
        `Descifrado: ${decipheredMsg}\n` +
        `Completo: ${decodedMsg}`);

  };
};

// rsa.cipher(msg, 2347, 347, 5);

