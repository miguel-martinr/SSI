import { AesCipher } from './aes.js';


const aes = new AesCipher();

function cipherText() {


  const clearText = getClearText();
  const key = getKey();
  
  const cipheredText = aes.cipher(key, clearText);

  setFlatCipheredText(cipheredText);
  setClearTextTable(clearText);
  setKeyTable(key);
  setCipheredTextTable(cipheredText);
  setLog(aes);
}

function getClearText() {
  const clearTextBox = document.getElementById('clearText');
  if (clearTextBox.value.length !== 32) {
    alert('Asegúrese de que el texto en claro sean 16 bytes!');
    return;
  }

  const clearTextStr = clearTextBox.value.split('');
  const clearText = [];

  for (let i = 0; i < 16; i++) {
    clearText.push(parseInt(clearTextStr.splice(0, 2).join(''), 16));
  }

  return clearText;
}

function getKey() {
  const keyBox = document.getElementById('key');
  if (keyBox.value.length !== 32) {
    alert('Asegúrese de que la clave sean 16 bytes!');
    return;
  }

  const keyStr = keyBox.value.split('');
  const key = [];

  for (let i = 0; i < 16; i++) {
    key.push(parseInt(keyStr.splice(0, 2).join(''), 16));
  }

  return key;
}

function setFlatCipheredText(cipheredText) {
  document.getElementById('cipheredText').value = cipheredText.map(b => b.toString(16).padStart(2, 0)).join('');
}

function setClearTextTable(clearText) {
  setTable('clearText-table', clearText);
}

function setKeyTable(key) {
  setTable('key-table', key);
}

function setTable(id, content) {
  const table = document.getElementById(id);
  table.innerHTML = '';

  const shapedContent = aes.transposeMatrix(aes.toMatrix(content)).flat(Infinity)
  const parsedTableContent = shapedContent.map(b => '0x' + b.toString(16).padStart(2, 0));
  let k = 0;
  for (let i = 0; i < 4; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 4; j++) {
      row.innerHTML += `<td>${parsedTableContent[k++]}</td>`;
    }
    table.appendChild(row);
  }
}

function setCipheredTextTable(cipheredText) {
  setTable('cipheredText-table', cipheredText);
}

function setLog(cipher) {
  const logTextArea = document.getElementById('log');
  logTextArea.value = '';
  cipher.log.forEach((loggy, i) => {
    const shapedSubkey = cipher.transposeMatrix(loggy.subkey).flat(Infinity).map(b => b.toString(16).padStart(2, 0)).join('');
    const shapedState = cipher.transposeMatrix(loggy.state).flat(Infinity).map(b => b.toString(16).padStart(2, 0)).join('');
    logTextArea.value += `R(${i} (Sublcave = ${shapedSubkey}) = ${shapedState}\n`;
  })
}

window.cipher = aes;
window.cipherText = cipherText;