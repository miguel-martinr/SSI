

export const ElGamal = function() {

// Objeto para logger la información y mostrarla en la página
  this.log = [];
  
  // User A: msg, random secretK, K = (a^x)^k (mod p)
  // User B: random secretX, K = (a^k)^x (mod p)
  // Encrypted msg = Km (mod p)
  // Decrypted msg = K^-1(Km) (mod p)
  this.cipher = function(primeP, intA, secretK, secretX, msg) {
    const userB = {
      privateX: secretX,
      publicToSend: Math.pow(intA, secretX) % primeP,
    }

    const userA = {
      privateK: secretK,
      publicToSend: Math.pow(intA, secretK) % primeP,
    }

    console.log(userB, userA);
  };
};


const cipher = new ElGamal();
cipher.cipher(17, 3, 5, 6, 9);