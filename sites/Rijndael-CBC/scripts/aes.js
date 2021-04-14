
import { ByteMultiplier } from './byte-multipliers.js';

export const AesCipher = function () {
  /***********************************************************************************/
  // Constantes
  // Multiplicador de bytes
  this.byteMultiplier = new ByteMultiplier(0x1b);

  // Número de columnas
  this.Nb = 4;

  // Número de rondas
  this.numOfRounds = 10;

  // Estado (intermedio)
  this.state = [];

  // Caja S
  this.Sbox = [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
  ];

  // Constantes de iteración
  this.RC = [
    [0x01, 0x00, 0x00, 0x00],
    [0x02, 0x00, 0x00, 0x00],
    [0x04, 0x00, 0x00, 0x00],
    [0x08, 0x00, 0x00, 0x00],
    [0x10, 0x00, 0x00, 0x00],
    [0x20, 0x00, 0x00, 0x00],
    [0x40, 0x00, 0x00, 0x00],
    [0x80, 0x00, 0x00, 0x00],
    [0x1B, 0x00, 0x00, 0x00],
    [0x36, 0x00, 0x00, 0x00],
  ]

  // Matriz para multiplicación en MixColumn
  this.mixColumnMatrix = [
    [0x02, 0x03, 0x01, 0x01],
    [0x01, 0x02, 0x03, 0x01],
    [0x01, 0x01, 0x02, 0x03],
    [0x03, 0x01, 0x01, 0x02],
  ];

  /***********************************************************************************/
  // Objetos para loggear la información en la página
  this.log = [];
  

  /***********************************************************************************/
  // Métodos
  /**
   * Receives a Number[] representing the initial text
   * @param {Number[]} key 
   * @returns A Number[][] square matrix. For example:
   * Input: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
   * Output: [
   *           [0,   1,  2,  3], 
   *           [4,   5,  6,  7],
   *           [8,   9, 10, 11],
   *           [12, 12, 14, 15],
   *         ]
   */
  this.toMatrix = function (key) {
    // Creates a copy of key
    let settedKey = [];
    for (let i = 0, k = 0; i < 4; i++) {
      settedKey.push([]);
      for (let j = 0; j < this.Nb; j++) {
        settedKey[i].push(key[k++])
      }
    }
    
    return settedKey;
  }

  /**
   * Recibe una matriz y devuelve su traspuesta.
   * @param  matrix 
   */
  this.transposeMatrix = function (matrix) {
    let transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    return transposedMatrix;
  }

  /**
   * Multiplica una matriz por una columna y devuelve el resultado
   */
  this.XORmultiplyMatrixByColumn = function(matrix, column) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push([]);
      for (let j = 0; j < this.Nb; j++) {
        result[i].push(this.byteMultiplier.multiply(matrix[i][j], column[j]));
      }
    }
    return result.map(row => row.reduce((result, val) => result ^ val));
  }

  /**
   * Retorna el resultado de aplicar la operación AddRoundKey entre dos matrices (xor)
   */
  this.AddRoundKey = function (state, key) {
    return state.map((row, i) => this.xor(row, key[i]));
  };

  /**
   * Realiza la sustitución de un byte con la caja S
   * @param  byte 
   * @returns 
   */
  this.ByteSub = function (byte) {
    return this.Sbox[byte];
  }

  /**
   * Aplica la operación ShiftRow descrita en las especificaciones del AES
   * Fila 0: 0 rotaciones, Fila 1: 1 rotación, etc...
   */
  this.ShiftRow = function (key) {
    const shifted = key.map(row => [...row]);
    for (let i = 0; i < this.Nb; i++) {
      shifted[i].roundLeft(i);
    }

    return shifted;
  }

  /**
   * Retorna el resultado de aplicar la operación MixColumn
   * a la matris state
   */
  this.MixColumn = function (state) {
    const result = []; 
    const transposedState = this.transposeMatrix(state);
    for (let i = 0; i < this.mixColumnMatrix.length; i++) {     
         result.push(this.XORmultiplyMatrixByColumn(this.mixColumnMatrix, transposedState[i]))
    }

    return this.transposeMatrix(result);
  }

  /**
   * Recibe dos vectores de igual longitud y retorna el resultado de aplicar la operación xor
   * elemento a elemento.
   */
  this.xor = function(array1, array2) {
    return array1.map((byte, index) => byte ^ array2[index]);
  }

  /**
   * Obtiene una subclave a partir otra
   * @param key Matriz de 4 x 4 bytes
   * @param rcIndex ïndice de la constante
   * @returns subKey Matriz de 4 x 4 bytes
   */
  this.expandKey = function (key, rcIndex) {

    let expandedKey = [];
    let words = this.transposeMatrix(key);
    const keyLastColumn = [...words[words.length - 1]];

    words[words.length - 1].roundLeft();
    words[words.length - 1] = words[key.length - 1].map(byte => this.ByteSub(byte));
    

    expandedKey.push(this.xor(this.xor(words[0], words[words.length - 1]), this.RC[rcIndex]));
    words[words.length - 1] = keyLastColumn;

    for (let i = 1; i < 4; i++) {
      expandedKey.push(this.xor(words[i], expandedKey[i - 1]));
    }

    return this.transposeMatrix(expandedKey);
  }

  /**
   * Devuelve 10 subclaves obtenidas a partir de la clave original
   * @param  key 
   * @returns 
   */
  this.getSubkeys = function(key) {
    const subkeys = [[...key]];
    for (let i = 0; i < this.numOfRounds; i++) {
      subkeys.push(this.expandKey(subkeys[i], i));
    }
    return subkeys;
  }

  Array.prototype.roundLeft = function (times = 1) {
    for (let i = 0; i < times; i++) this.push(this.shift());
  }

  /**
   * Cifra un bloque de texto de 16 elementos
   * @param {number[]} key 128 bits
   * @param {number[]} clearText 
   */
  this.cipher = function (Flatkey, clearText) {
    // Pasamos la entrada a matriz y luego obtenemos la transpuesta
    const key = this.transposeMatrix(this.toMatrix(Flatkey));
    
    // Cálculo de subclaves
    const subkeys = this.getSubkeys(key);

    // Ronda inicial
    this.state = this.AddRoundKey(key, this.transposeMatrix(this.toMatrix(clearText)));
    
    // Logging
    this.log = [];
    this.log.push({subkey: subkeys[0], state: this.state});

    //Ronda estándar
    for (let i = 1; i < this.numOfRounds; i++) {
      // ByteSub
      this.state = this.state.map(row => row.map(byte => this.ByteSub(byte)));

      // ShiftRow
      this.state = this.ShiftRow(this.state);

      // MixColumn
      this.state = this.MixColumn(this.state);

      // AddRound key
      this.state = this.AddRoundKey(this.state, subkeys[i]);

      // Logging
      this.log.push({subkey: subkeys[i], state: this.state});
    }

    //Ronda final
    // ByteSub
    this.state = this.state.map(row => row.map(byte => this.ByteSub(byte)));

    //ShiftRow
    this.state = this.ShiftRow(this.state);

    //AddRoundKey
    this.state = this.AddRoundKey(this.state, subkeys[subkeys.length - 1]);

    // Logging
    this.log.push({subkey: subkeys[10], state: this.state});

    return this.transposeMatrix(this.state).flat(Infinity);
  };


};

// const aes = new AesCipher();

// const key = [
//   0x00, 0x01, 0x02, 0x03, 
//   0x04, 0x05, 0x06, 0x07,
//   0x08, 0x09, 0x0a, 0x0b,   
//   0x0c, 0x0d, 0x0e, 0x0f,
// ]

// const msg = [
//   0x00, 0x11, 0x22, 0x33,
//   0x44, 0x55, 0x66, 0x77, 
//   0x88, 0x99, 0xaa, 0xbb, 
//   0xcc, 0xdd, 0xee, 0xff, 
// ]

// const ciphered = aes.cipher(key, msg).map(b => b.toString(16));
// console.log(aes.log);