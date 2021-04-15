// Distintas funciones de utilidad


/**
 * Recibe un vector plano y devuelve una matriz de las dimensiones especificadas con los elementos de dicho vector
 * @param {[]} arr Vector de elementos primitivos
 * @param {*} numOfRows Número de filas
 * @param {*} numOfCols Número de columnas
 * @returns Matriz de dimensiones numOfRows x numOfcols con los elementos de arr
 */
export const toMatrix = function(arr, numOfRows, numOfCols) {
  let result = [];
  let k = 0;
  for (let i = 0; i < numOfRows; i++) {
    result.push([]);
    for (let j = 0; j < numOfCols && k < arr.length; j++) {
      result[i].push(arr[k++]);
    }
  }
  return result;
}

/**
 * Recibe dos vectores numéricos de la misma longitud y devuelve el resultado de aplicar XOR entre los dos elemento a elemento.
 * @param {number[]} array1 
 * @param {number[]} array2 
 * @returns 
 */
export const xorArrays = function(array1, array2) {
  return array1.map((num, i) => num ^ array2[i]);
}

export const orArrays = function(array1, array2) {
  return array1.map((num, i) => num | array2[i]);
}

/**
 * Recibe una matriz dimensional y devuelve su traspuesta
 * @param  matrix 
 * @returns 
 */
export const transposeMatrix = function (matrix) {
  let transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  return transposedMatrix.map(row => row.filter(b => b !== undefined));
}

/**
 * Divide un array en fragmentos de tamaño itemsLength. Si el número de elementos no es múltiplo de itemsLength
 * el último elemento es de tamaño menor.
 * @param  array_ 
 * @param  itemsLength 
 * @returns Nuevo objeto con los arrays resultantes de la división 
 */
export const splitArray = function(array_, itemsLength)  {
  const array = [...array_];
  const result = [];
  let times = array.length / itemsLength;
  
  for (let i = 0; i < times; i++) {
    result.push(array.splice(0, itemsLength));
  }
  return result;
}

/**
 * Recibe un array y lo rellena por la derecha con elemtnos de valor value hasta tener un tamaño de length.
 * Retorna un nuevo objeto (no modifica el que se pasa por parámetro)
 */
export const fillWith = function(arr, value, length) {
  const result = [...arr];
  while (result.length < length) {
    result.push(value);
  }
  return result;
}



