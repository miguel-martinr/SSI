import 'mocha';
import {expect} from 'chai';
import {ChaCha20} from './chacha20.js'


describe('ChaCha20 cipher tests', () => {
  const chacha20 = new ChaCha20();
  
  it('Generator output', () => {
    const input = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574,
      0x03020100, 0x07060504, 0x0b0a0908, 0x0f0e0d0c,
      0x13121110, 0x17161514, 0x1b1a1918, 0x1f1e1d1c,
      0x00000001, 0x09000000, 0x4a000000, 0x00000000];
    const expectedOutputState = [0xe4e7f110, 0x15593bd1, 0x1fdd0f50, 0xc47120a3,
      0xc7f4d1c7, 0x0368c033, 0x9aaa2204, 0x4e6cd4c3,
      0x466482d2, 0x09aa9f07, 0x05d7c214, 0xa2028bd9,
      0xd19c12b5, 0xb94e16de, 0xe883d0cb, 0x4e3c50a2];
    
    expect(chacha20.chachaBlock(input)).to.be.eql(expectedOutputState);
  });
  
  it('https://tools.ietf.org/html/rfc7539 2.3.2 chacha state after 20 rounds', () => {
    const expectedfinalState = [0x837778ab, 0xe238d763, 0xa67ae21e, 0x5950bb2f,
      0xc4f2d0c7, 0xfc62bb2f, 0x8fa018fc, 0x3f5ec7b7,
      0x335271c2, 0xf29489f3, 0xeabda8fc, 0x82e46ebd,
      0xd19c12b4, 0xb04e16de, 0x9e83d0cb, 0x4e3c50a2];
      expect(chacha20.state).to.eql(expectedfinalState);
    });
    
});
