/**
 * Implementación del cifrado de Vigenère
 * 
 * @author Miguel Martín
 * @email alu0101209777@ull.edu.es
 */

/**
 * Constructor de objetos VigenereCipher
 * @param {string} key Clave de cifrado.
 * @param {array} alphabet Alfabeto de cifrado.
 */
export function VigenereCipher(key = 'mision', alphabet = []) {
  if (alphabet.length === 0) {
    // Alfabeto por defecto
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
      's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }

  this.key = key.toLowerCase();
  this.alphabet = alphabet;

  /**
   * Cifra un caracter
   * @param {char} char Caracter a cifrar.
   * @param {int} index Índice correspondiente a la clave.
   * @return {char} Caracter cifrado.
   */
  this.cipherChar = function(char, index) {
    return this.charCipher(char, index);
  };

  /**
   * Descifra un caracter
   * @param {char} char Caracter a descifrar.
   * @param {int} index Índice correspondiente a la clave.
   * @return {char} Caracter descifrado.
   */
  this.decipherChar = function(char, index) {
    return this.charCipher(char, index, false);
  };

  /**
   * Cifra un mensaje
   * @param {string} message Mensaje a cifrar.
   * @return {string} Mensaje cifrado.
   */
  this.cipherMessage = function(message) {
    return this.messageCipher(message);
  };

  /**
   * Descifra un mensaje
   * @param {string} message Mensaje a descifrar.
   * @return {string} Mensaje descifrado.
   */
  this.decipherMessage = function(message) {
    return this.messageCipher(message, false);
  };


  /**
   * Cifra o descifra un caracter
   * @param {char} ogChar Caracter.
   * @param {int} index Índice correspondiente a la clave.
   * @param {bool} cipher true: cifra, false: descifra
   * @return {char} Caracter resultado.
   */
  this.charCipher = function(ogChar, index, cipher = true) {
    // Convertimos el caracter a lowecase y eliminamos acentos 
    const char = ogChar.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const key = this.key;
    const alphabet = this.alphabet;

    // Verificamos que el índice pertenezca a la clave
    if (index < 0 || index >= key.length) {
      return undefined;
    }

    // Verificamos que el caracter pertenezca al alfabeto
    if (alphabet.indexOf(char) < 0) {
      return undefined;
    }

    const charIndex = alphabet.indexOf(char);
    const keyCharIndex = alphabet.indexOf(key[index]);

    const offset = charIndex + (cipher ? keyCharIndex : -keyCharIndex);
    const cipheredCharIndex = (offset < 0 ? alphabet.length + offset : offset) % alphabet.length;
    const result = alphabet[cipheredCharIndex];

    return result;
  };

  /**
   * Cifra o descifra un mensaje
   * @param {string} message mensaje.
   * @param {bool} cipher true: cifra, false: descifra.
   * @return {string} Mensaje resultado.
   */
  this.messageCipher = function(message, cipher = true) {
    let keyIndex = 0;
    let cipheredMessage = '';

    // Convertimos el mensaje a un array de caracteres y ciframos cada uno de ellos
    message.split('').map( (letter) => {
      const cipheredChar = cipher ? this.cipherChar(letter, keyIndex % this.key.length) : this.decipherChar(letter, keyIndex % this.key.length);
      if (cipheredChar) {
        cipheredMessage += cipheredChar;
        keyIndex++;
      }
    });

    return cipheredMessage;
  };
};


