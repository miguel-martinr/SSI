import { InverseOf as InverseOf, fastModularExponentiation, lehmanPeraltaTest } from './utilities.js';


export const RSA = function(base = 16) {
  
  this.base = base;

  /**
   * Calcula el tamaño de los bloques
   * @param {number} base base en la que se quiere codificar el mensaje
   * @param {number} n módulo
   */
  this.getBlockSize = function(base, n) {
    return (Math.log(n) / Math.log(base)) | 0;
  };


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
                `Se comprueba que d es primo con fi(n)= ${fiN}\n` +
                `Se calcula e= ${e}` +
                `Como n=${n}, se divide el texto en bloques de ${this.getBlockSize(this.base, n)} caracteres\n` +
                `Se pasa cada bloque a decimal para poder cifrar, obteniendo`);

  };
};

const rsa = new RSA();

rsa.cipher(421, 7, 1619);

