import 'mocha';
import { expect } from 'chai';
import { ElGamal } from "./elgamal.js"

describe('ElGamal tests', () => {
  const encrypter = new ElGamal();
  const tests = [
    { input: [13, 4, 5, 2, 8], output: [10, 3, 9, 7, 3, 8] },
    { input: [43, 23, 25, 33, 18], output: [40, 16, 4, 29, 11, 18] },
    { input: [113, 43, 54, 71, 28], output: [11, 29, 61, 13, 63, 28] },
  ];

  it('Encrypts successfully', () => {
    expect(encrypter.run(...tests[0].input).serialized).to.be.eql(tests[0].output);
  });

  it('Encrypts successfully', () => {
    expect(encrypter.run(...tests[1].input).serialized).to.be.eql(tests[1].output);
  });

  it('Encrypts successfully', () => {
    expect(encrypter.run(...tests[2].input).serialized).to.be.eql(tests[2].output);
  });
});
