import {RC4} from './rc4.js'

let seed = [2,5];
let msg = [1, 34];

let encrypted = new RC4().apply(msg, seed);

console.log(`Message: ${msg}`);
console.log(`Encrypted: ${encrypted}`)
console.log(`Decrypted: ${new RC4().apply(encrypted, seed)}`);