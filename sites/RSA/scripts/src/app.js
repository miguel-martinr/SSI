import { RSA } from './RSA.js';

const rsa = new RSA();


const run = () => {
  const inParams = getInParams();
  const clearText = getClearText();
  rsa.cipher(clearText, inParams.p, inParams.q, inParams.d);
  setOutParams(rsa.log.outParams);
  setSplittedBlocks(rsa.log.splittedBlocks.join(', '));
  setEncodedBlocks(rsa.log.encodedBlocks.join(', '));
  setCipheredBlocks(rsa.log.cipheredBlocks.join(', '));
};

const setOutParams = (outParams) => {
  setValue('outParams', JSON.stringify(outParams, null, 1).replace('fiN', 'Φ(n)'));
};

const setCipheredBlocks = (cipheredBlocks) => {
  setValue('cipheredBlocks', cipheredBlocks);
};

const setEncodedBlocks = (encodedBlocks) => {
  setValue('encodedBlocks', encodedBlocks);
};

const setSplittedBlocks = (splittedBlocks) => {
  setValue('splittedBlocks', splittedBlocks);
};

const getClearText = () => {
  return getValueOf('clearText');
};

const getInParams = () => {
  return JSON.parse(getValueOf('inParams'));
};


const getValueOf = (id) => {
  return document.getElementById(id).value;
};

const setValue = (id, value) => {
  document.getElementById(id).value = value;
};


window.run = run;
