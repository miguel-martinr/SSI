import {ChaCha20} from './chacha20.js';


function setState() {
  const constants = [];
  for (let element of document.getElementsByClassName('const')) {
    constants.push(parseInt(element.value, 16));
  }
  
  const key = [];
  for (let element of document.getElementsByClassName('key')) {
    key.push(parseInt(element.value, 16));
  }

  const counter = [];
  for (let element of document.getElementsByClassName('counter')) {
    counter.push(parseInt(element.value, 16));
  }

  const nonce = [];
  for (let element of document.getElementsByClassName('nonce')) {
    nonce.push(parseInt(element.value, 16));
  }
  
  const newState = constants.concat(key, counter, nonce);
  chacha20.state = newState;


}

function parseState(state) {
  let parsedState = '';
  state.forEach((element) => parsedState += '0x' +element.toString(16).padStart(8, 0) + ' ' )
  return parsedState;
}

function generate() {
  setState();
  const parsedState = parseState(chacha20.state);
  document.getElementById('initState').value = parsedState;

  const parsedChachaBlock = parseState(chacha20.chachaBlock());
  document.getElementById('finalState').value = parsedChachaBlock;

  const parsedMidState = parseState(chacha20.state);
  document.getElementById('midState').value = parsedMidState;


  
}
const chacha20 = new ChaCha20();

window.chacha20 = chacha20;
window.setState = setState;
window.generate = generate;







