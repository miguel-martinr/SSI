import { FastModularExponentiation, InverseOf } from "./utilities.js";


export const ElGamal = function() {

// Objeto para logger la información y mostrarla en la página
  this.log = [];
  
  // User A: msg, random secretK, K = (a^x)^k (mod p)
  // User B: random secretX, K = (a^k)^x (mod p)
  // Encrypted msg = Km (mod p)
  // Decrypted msg = K^-1(Km) (mod p)

  /**
   * 
   * @param {number} primeP Número primo
   * @param {number} intA Número entero
   * @param {number} secretK Número aleatorio privado de A
   * @param {number} secretX Número aleatorio privado de B
   * @param {number} msg Mensaje a cifrar
   * @returns 
   */
  this.run = function(primeP, intA, secretK, secretX, msg) {
    // Logging
    this.log = {
      input: {
        primeP: primeP,
        intA: intA,
        secretK: secretK,
        secretX: secretX,
        msg: msg,
      }
    };

    // Valores que conoce el sujeto (receptor) B
    const userB = {
      id: 'B',
      privateX: secretX, // Valor privado de B
      publicToSend: FastModularExponentiation(intA, secretX, primeP), // Valor público de B
    }

    // Vallores que conoce el usuario A (emisor)
    const userA = {
      id: 'A',
      privateK: secretK, // Valor privado de A
      publicToSend: FastModularExponentiation(intA, secretK, primeP), // Valor público de A
      
      sharedKey: FastModularExponentiation(userB.publicToSend, secretK, primeP), // Clave compartida con B
      msg: msg, // Mensaje a cifrar
    }

    userB.sharedKey = FastModularExponentiation(userA.publicToSend, secretX, primeP); // Clave compartida con A
    userA.encryptedMsg = (userA.sharedKey * userA.msg) % primeP; // Mensaje encriptado

    // Descifrado del mensaje
    let sharedKeyInverse = new InverseOf(userB.sharedKey).module(primeP);
    if (sharedKeyInverse) {
      userB.decryptedMsg = sharedKeyInverse * userA.encryptedMsg % primeP;
      userB.decryptedMsg = userB.decryptedMsg < 0 ? primeP + userB.decryptedMsg : userB.decryptedMsg;
      userB.sharedKeyInverse = sharedKeyInverse;
    } else {
      console.log('No inverse');
    }

    this.log.output = {
      serialized: [userA.publicToSend, userB.publicToSend, userA.sharedKey & userB.sharedKey, userA.encryptedMsg,
        userB.sharedKeyInverse, userB.decryptedMsg],  
      A: userA,
      B: userB,
    };

    return this.log.output;
    
    // console.table(userB);
    // console.table(userA);
  };
};

// console.log(new InverseOf(61).module(113));


