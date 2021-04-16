import { AesCBC } from './aes_cbc.js';
import { toMatrix , transposeMatrix } from './utilities.js';
import { xorArrays } from './utilities.js';

const cipher = new AesCBC();

function cipherText() {
  const clearText = getClearText();
  const key = getKey();
  const initArray = getInitArray();

  cipher.initArray = initArray;
  const cipheredText = cipher.cipher(clearText, key);

  setCipheredText(cipheredText);
  setClearTextTable(clearText);
  setKeyTable(key);
  setCipheredTextTable(cipheredText);
  setLog();
}

function setLog() {
  const logArea = document.getElementById('log');

  // Loggeo entrada
  logArea.value = 'Entrada: \n'+ 
                  `        Clave: ${cipher.log.input.key.map(b => b.toString(16).padStart(2, '0')).join(' ')}\n` +
                  `        IV: ${cipher.log.input.iv.map(b => b.toString(16).padStart(2, '0')).join(' ')}\n`;
  cipher.log.input.blocks.forEach((block, i) => {
    logArea.value += `        Bloque ${i + 1} de Texto Original: ${block.map(b => b.toString(16).padStart(2, '0')).join(' ')}\n`;
  });

  // Loggeo salida
  logArea.value += '\nSalida: \n';        
  cipher.log.output.blocks.forEach((block, i) => {
  logArea.value += `        Bloque ${i + 1} de Texto cifrado: ${block.map(b => b.toString(16).padStart(2, '0')).join(' ')}\n`;
});
}

function setCipheredText(cipheredText) {
  const cipheredPlace = document.getElementById('cipheredText');
  cipheredPlace.value = cipheredText.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getClearText() {
  return getAndParseValue('clearText', 'el texto en claro');
}

function getKey() {
  const key = getAndParseValue('key', 'la clave');
  if (key.length != 16) {
    const alertMsg = `La clave no puede tener ${key.length < 16 ? 'menos' : 'mas'} de 16 bytes! ` +
      `${key.length > 16 ? 'Sobra' : 'Falta'}(n) ${key.length > 16 ? key.length - 16 : 16 - key.length} byte(s).`;
    alert(alertMsg);
    return; 
  } 

  return key;
}

function getInitArray() {
  const initArray = getAndParseValue('initArray', 'el vector de inicialización');
  if (initArray.length != 16) {
    const alertMsg = `El vector de inicialización no puede tener ${initArray.length < 16 ? 'menos' : 'mas'} de 16 bytes! ` +
    `${initArray.length > 16 ? 'Sobra' : 'Falta'}(n) ${initArray.length > 16 ? initArray.length - 16 : 16 - initArray.length} byte(s).`;
    alert(alertMsg);
    return;
  }
  
  return initArray;
}

function getAndParseValue(id, msg = 'los valores') {

  const strValue =  document.getElementById(id).value.split('');
  if (strValue.length % 2) {
    alert(`Ha introducido un núero impar de dígitos. Asegúrese de que ${msg} son bytes de la forma XX!`);
    return;
  }

  const parsedValue = [];
  while (strValue.length > 0) {
    parsedValue.push(parseInt(strValue.splice(0, 2).join(''), 16));
  }
  return parsedValue;
}

function setTable(id, content) {
  const table = document.getElementById(id);
  table.innerHTML = '';

  const shapedContent = transposeMatrix(toMatrix(content, content.length / 4, 4));
  const parsedTableContent = shapedContent.map(row => row.map(b => '0x' + b.toString(16).padStart(2, 0)));
  let k = 0;
  for (let i = 0; i < parsedTableContent.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < parsedTableContent[i].length; j++) {
      row.innerHTML += `<td>${parsedTableContent[i][j]}</td>`;
    }
    table.appendChild(row);
  }
}

function setClearTextTable(clearText) {
  setTable('clearText-table', clearText);
}

function setKeyTable(key) {
  setTable('key-table', key);
}

function setCipheredTextTable(cipheredText) {
  setTable('cipheredText-table', cipheredText);
}


window.cipherText = cipherText;
window.cipher = cipher;
window.xorArrays = xorArrays;


