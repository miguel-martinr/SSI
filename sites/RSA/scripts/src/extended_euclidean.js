export const extendedEuclidean = function(a, b) {
  const x = [undefined, a, b];
  const z = [0, 1];

  let i = 2;
  let remainder = x[i-1] % x[i];

  while (remainder !== 0) {
    x.push(remainder);
    
    let temp = ((- x[i-1] / x[i]) | 0) * z[i-1] + z[i-2];
    
    // Se maneja el caso de que el resultado seanegativo
    while (temp < 0) {
      temp += a;
    }
    
    z.push(temp % a);

    i++;
    remainder = x[i-1] % x[i];
  }

  return {
    get mcd() {
      return this.x[this.x.length-1];
    },
    get inverse() {
      if (this.mcd === 1) return this.z[this.z.length-1];
      return null;
    }, 

    x: [...x],
    z: [...z],
  };
};

