import { ExtendedEuclidean } from './extended_euclidean.js';
// Distintas funciones de utilidad



/**
 * Calcula la inversa de un número b módulo un número a, tal que a > b, 
 * empleando el algorimto de Euclides extendido
 * @param {*} b 
 */
export const InverseOf = function(b) {
  this.module = function(a) {
    return ExtendedEuclidean(a, b).inverse;    
  }
}

// console.log(new InverseOf(12).module(19));

/**
 * Exponenciación rápida
 * @param {number} a Base
 * @param {number} b Exponente
 * @param {number} m Módulo
 */
export const FastModularExponentiation = function(a, b, m) {
  let x = 1;
  let y = a % m;

  while (b > 0 && y > 1) {
    if (b % 2 !== 0) {
      x = (x * y) % m;
      b--;
    } else {
      y = (y * y) % m;
      b = b / 2;
    }
  }

  return x;
}

// console.log(FastModularExponentiation(2, 28, 79)); --> 13

