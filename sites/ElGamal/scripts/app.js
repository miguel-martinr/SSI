import { ElGamal } from "./elgamal.js";

const elgamal = new ElGamal();
const glosary = {
  'msg': 'Mensaje',
  'secretK': 'Número secreto K de Bob',
  'secretX': 'Número secreto X de Alice',
  'primitiveRoot': 'Número entero a',
  'primeP': 'Número primo p',
  'sharedKeyA': 'Clave compartida (campo de Bob)',
  'sharedKeyB': 'Clave compartida (campo de Alice)',
}
function main() {
  const result = elgamal.run(getPrimeP(), getPrimitiveRootA(), 
    getSecretK(), getSecretX(), getMsg());

  setSharedKeyA(result.A.sharedKey);
  setSharedKeyB(result.B.sharedKey);
  setEncryptedMsg(result.A.encryptedMsg);
  setPublicTosendA(result.A.publicToSend);
  setPublicTosendB(result.B.publicToSend);
  setDecryptedMsg(result.B.decryptedMsg);
  setLog();
}

// Getters
function getMsg() {
  return getValue('msg');
}

function getSecretK() {
  return getValue('secretK');
}

function getPrimitiveRootA() {
  return getValue('primitiveRoot');
}

function getPrimeP() {
  return getValue('primeP');
}

function getSecretX() {
  return getValue('secretX');
}

function getValue(id) {
  const result = document.getElementById(id).value;
  if (result) return parseInt(result);
  alert(`Eror al obtener el valor ->${glosary[id]}<-`);
}

// Setters
function setSharedKeyA(sharedKey) {
  setValue('sharedKeyA', sharedKey);
}

function setSharedKeyB(sharedKey) {
  setValue('sharedKeyB', sharedKey);
}

function setEncryptedMsg(encryptedMsg) {
  setValue('encryptedMsg', encryptedMsg);
}

function setPublicTosendA(publicToSendA) {
  setValue('publicToSendA', publicToSendA);
}

function setPublicTosendB(publicToSendB) {
  setValue('publicToSendB', publicToSendB);
}

function setValue(id, value) {
  const result = document.getElementById(id).value = value;
  if (result) return result;
  alert(`Eror al obtener el valor ->${glosary[id]}<-`);
}

function setDecryptedMsg(decryptedMsg) {
  setValue('decryptedMsg', decryptedMsg);
}

function setLog() {
  const logBox = document.getElementById('log');
  const input = elgamal.log.input;
  const output = elgamal.log.output;
  logBox.value = ` Entrada: p = ${input.primeP}, a = ${input.intA}, k = ${input.secretK}, x = ${input.secretX}, msg = ${input.msg}\n`;
  logBox.value += ` Saldia: Ya = ${output.A.publicToSend}, Yb = ${output.B.publicToSend}, K = ${output.A.sharedKey}, C = ${output.A.encryptedMsg}, K^-1 = ${output.B.sharedKeyInverse}, M = ${output.B.decryptedMsg}\n`;
}





window.main = main;

window.elgamal = elgamal;

