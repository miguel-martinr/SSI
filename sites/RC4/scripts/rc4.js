

/**
 * RC4 enrypter
 */
export function RC4() {

  /**
   * Swaps arr[i] and arr[j] in place
   * @param {Array} arr 
   * @param {number} i 
   * @param {number} j 
   */
  this.swap = function (arr, i, j) {
    if (i < 0 || i >= arr.length || j < 0 || j > arr.length) return false;
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp; 
  }

  /**
   * Applies Key Scheduling Algorithm. Initialization for 
   * RC$ encryption.
   * @param {number[]} key Also known as seed
   * @param {number} stateLength Length of state array, 256 by default
   */
  this.ksa = function(key, stateLength = 256) {
    this.state = new Array(stateLength)
    this.k = new Array(stateLength)
  
    // Initializing
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = i;
      this.k[i] = key[i % key.length];
    }
  

    // Permutating
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + this.state[i] + this.k[i]) % 256;
      this.swap(this.state, i, j);
    }

    let state= this.state;
  }
  

  /**
   * Applies Pseudo Random Generation Algorithm. Generates encryptyng
   * bytes according to a key for encrypting / decrypting a message
   * and encrypts / decrypts the message.
   * @param {number[]} message Message to be processed
   * @return {number[]} The processed message
   */
  this.prga = function(message) {
    let i = 0;
    let j = 0;
    let t;

    let lastSteps = '';

    let processedMessage  =[];

    for (let k = 0; k < message.length; k++) {
      i = (i + 1) % 256;
      j = (j + this.state[i]) % 256;
      this.swap(this.state, i, j);

      t = (this.state[i] + this.state[j]) % 256;
      let encryptedByte = message[k] ^ this.state[t];
      processedMessage = processedMessage.concat(encryptedByte); 


      lastSteps += '\n' +
      `Byte ${k + 1} de secuencia cifrante: Salida  = S[${t}] = ${this.state[t]} \t\t ${this.state[t].toString(2).padStart(8, 0)}\n` +
      `Byte ${k + 1} de texto original    : Entrada = M[${k + 1}] = ${message[k]} \t\t ${message[k].toString(2).padStart(8, 0)}\n` +
      `Byte ${k + 1} de texto cifrado     : Salida  = C[${k + 1}] = ${encryptedByte} \t\t ${encryptedByte.toString(2).padStart(8, 0)}`;
      
    }
    this.lastSteps = lastSteps;
    return processedMessage;
  }


  /**
   * Applies RC4 encryption algorithm to a message 
   * @param {number[]} message 
   * @param {number[]} key
   * @returns {number[]} Processed message
   */
  this.apply = function (message, key) {
    this.ksa(key);
    return this.prga(message);
  }



  this.lastSteps = 'Todavía no hay pasos!';

}