
import {VigenereCipher} from './vigenere-cipher.js'

let showKey = false;
let vigenere = new VigenereCipher();

function toggleKeyView() {
  let keyCheckBox = document.getElementById('showKeyInput');
  let keyInput = document.getElementById('key');
  
  showKey = !showKey;
  if (showKey) {
    keyInput.type = 'text';
  } else {
    keyInput.type = 'password';
  }
}

function updateKey() {
  let newKey = document.getElementById('key').value;
  if (newKey) {
    vigenere.key = newKey;
  }
}

function cipherMessage() {
  let message = document.getElementById('message').value;
  let cipheredMessage = vigenere.cipherMessage(message);

  document.getElementById('cipheredMessage').value = cipheredMessage;
}

function decipherMessage() {
  let cipheredMessage = document.getElementById('cipheredMessage').value;
  let message = vigenere.decipherMessage(cipheredMessage);

  document.getElementById('message').value = message;
}

function copyCipheredToClipBoard() {
  /* Get the text field */
  var copyText = document.getElementById("cipheredMessage");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Mensaje cifrado copiado");
}

window.copyCipheredToClipBoard =copyCipheredToClipBoard;
window.updateKey = updateKey;
window.decipherMessage = decipherMessage;
window.cipherMessage = cipherMessage;
window.toggleKeyView = toggleKeyView; 
window.vigenere = vigenere;

