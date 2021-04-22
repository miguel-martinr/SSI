export const ExtendedEuclidean = function(a, b) {
  const x = [undefined, a, b];
  const z = [0, 1];

  let i = 2;
  let remainder = x[i-1] % x[i];

  while (remainder !== 0) {
    x.push(remainder);
    
    let temp = ((- x[i-1] / x[i]) | 0) * z[i-1] + z[i-2];
    // temp = temp < 0 ? a - temp : temp;
    // console.log(`Temp: ${temp}`)
    z.push(temp % a);

    i++;
    remainder = x[i-1] % x[i];
  }

  // if (x[i] === 1) {
  //   console.log(`Inversa: ${z[i-1]}`);
  //   console.log('X', x);
  //   console.log('Z', z);
  // } else {
  //   console.log(`QUe hago miniño`);
  // }´

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
  }
};

