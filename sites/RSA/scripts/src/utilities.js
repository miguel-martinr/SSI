import { extendedEuclidean } from './extended_euclidean.js';
// Distintas funciones de utilidad


/**
 * Calcula la inversa de un número b módulo un número a, tal que a > b, 
 * empleando el algorimto de Euclides extendido
 * @param {*} b 
 */
export const InverseOf = function(b) {
  this.module = function(a) {
    return extendedEuclidean(a, b).inverse;    
  };
};

// console.log(new InverseOf(12).module(19));

/**
 * Exponenciación rápida
 * @param {number} a Base
 * @param {number} b Exponente
 * @param {number} m Módulo
 */
export const fastModularExponentiation = function(a, b, m) {
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
};

// console.log(FastModularExponentiation(2, 28, 79)); --> 13


/**
 * Test de primalidad de Lehman y Peralta
 * @param {number} p Número a comprobar posibilidad de ser primo
 */

export const lehmanPeraltaTest = function(p) {
  const smallPrimes = [2, 3, 5, 7, 11];
  
  // Comprobar que p no es divisible por ningún primo pequeño
  // for (let i = 0; i < smallPrimes.length; i++) {
  //   if (p % smallPrimes[i] === 0) return false;
  // }

  const numOfRandomInts = (p < 101 ? p-2 : 100);

  let randomInts = new Set();
  
  let i = 2;
  while (randomInts.size !== numOfRandomInts) {
    const randomInt = p < 101 ? i++ : getRandomInt(2, p-1);
    randomInts.add(randomInt);  
  }

  randomInts = [...randomInts].map((n) => fastModularExponentiation(n, (p-1)/2, p));
  const a = randomInts.map((n) => n === p - 1 ? -1 : n);
  

  // Si para todo i, aiP (p-1)/2 === 1, es compuesto
  if (!a.find((n) => n !== 1)) return false;

  // Else, si existe i tal que ai^(p-1)/2 != -1, es compuesto
  if (a.find((n) => n !== -1 && n !== 1)) return false;

  // Else, tal vez es compuesto
  return true;
};


/**
 * Devuelve un entero pseudoaleatorio entre dos límites
 * @param {number} min límite inferior
 * @param {number} max límite superior
 * @returns 
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}
