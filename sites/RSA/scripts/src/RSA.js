import { InverseOf as InverseOf, fastModularExponentiation, lehmanPeraltaTest } from './utilities.js';

const alphabet = {
  'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M':12, 
  'N':13, 'O':14, 'P':15, 'Q':16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
};

export const RSA = function(base = 16, alph = alphabet) {
  
  this.base = base;
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
   */
  this.codifyBlock = function(block) {

    const alphLength = Object.values(this.alph).length;
    const codifiedChars = block.split('').map((c, i) => {
      const temp1 = this.alph[c];
      const temp2 = Math.pow(alphLength, msg.length - 1 - i);
      const codifiedChar = temp1 * temp2;
      return codifiedChar;
    });

    return codifiedChars.reduce((total, cur) => total + cur);
  };

  this.splitMessage = function(msg, blockSize) {
    const splittedMessage = [];
    const msgChars = msg.toUpperCase().split('').filter(c => Object.keys(this.alph).includes(c));
    for(let i = 0; i < msg.split('').length / blockSize; i++) {
      splittedMessage.push(msgChars.splice(0, blockSize));
    }

    return splittedMessage;
  }



  this.cipher = function(clearText, p, q, d) {
    if (!lehmanPeraltaTest(p)) {
      console.log(`Error: ${p} no es primo`);
      return;
    }

    if (!lehmanPeraltaTest(q)) {
      console.log(`Error: ${q} no es primo`);
      return;
    }
    const n = p * q;
    const fiN = (p-1) * (q-1);
    const e = new InverseOf(d).module(fiN);

    // if (e * d !== 1 + fiN) {
    //   console.log(`Error, d no es primo con fi(n)`);
    //   return;
    // }

    console.log(`Se comprueba que p y q son primos \n` +
                `Se comprueba que d es primo con fi(n) = ${fiN}\n` +
                `Se calcula e = ${e}\n` +
                `Como n = ${n}, se divide el texto en bloques de ${this.getBlockSize(this.base, n)} caracteres\n` +
                `Se pasa cada bloque a decimal para poder cifrar, obteniendo`);

  };
};

const rsa = new RSA();

const msg = 'MANDA DINEROS'
console.log(rsa.splitMessage(msg, 2));
// rsa.cipher(msg, 421, 7, 1619);

