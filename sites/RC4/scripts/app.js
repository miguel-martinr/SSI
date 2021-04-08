
import {RC4} from './rc4.js'

let showKey = false;
let rc4 = new RC4();
document.getElementById('process-steps').value = rc4.lastSteps;

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

function getKey() {
  let key = document.getElementById('key').value;
  if (!key) {
    alert('La clave está vacía!');
  } 
  return key;
}

function processMessage() {
  let message = document.getElementById('message').value;
  let parsedMessage = message.split(',').map((char) => parseInt(char));
  let parsedKey = getKey().split(',').map((char) => parseInt(char));

  let processedMessage = rc4.apply(parsedMessage, parsedKey);
  document.getElementById('processedMessage').value = processedMessage.join(', ');
  document.getElementById('process-steps').value = rc4.lastSteps;
}


function copyProcessedToClipBoard() {
  /* Get the text field */
  var copyText = document.getElementById("processedMessage");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Mensaje copiado");
}

window.rc4 = rc4;
window.copyProcessedToClipBoard = copyProcessedToClipBoard;
window.getKey = getKey;
window.processMessage = processMessage;
window.toggleKeyView = toggleKeyView; 


