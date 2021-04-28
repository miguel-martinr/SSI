import 'mocha';
import { expect } from 'chai';
import { RSA } from '../src/RSA.js';
import { lehmanPeraltaTest } from '../src/utilities.js';

describe('Tests generales', () => {
  const rsa = new RSA();
  it('Calcula el tamaño de bloque', () => {
    expect(rsa.getBlockSize(2, 143)).to.be.eq(7);
    expect(rsa.getBlockSize(10, 143)).to.be.eq(2);
    expect(rsa.getBlockSize(26, 143)).to.be.eq(1);

    expect(rsa.getBlockSize(2, 8051)).to.be.eq(12);
    expect(rsa.getBlockSize(10, 8051)).to.be.eq(3);
    expect(rsa.getBlockSize(26, 8051)).to.be.eq(2);
    
  });

  it('Test de primalidad Lehman y Peralta', () => {
    expect(lehmanPeraltaTest(7)).to.be.true;
    expect(lehmanPeraltaTest(1279)).to.be.true;
    expect(lehmanPeraltaTest(1278)).to.be.false;
    expect(lehmanPeraltaTest(1879)).to.be.true;
    expect(lehmanPeraltaTest(1610)).to.be.false
    expect(lehmanPeraltaTest(19463)).to.be.true;
    expect(lehmanPeraltaTest(104381)).to.be.true;  
  });

  
});
