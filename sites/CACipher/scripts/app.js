import {CA_Generator} from './c_a.js';


const caGenerator = new CA_Generator();
function init() {
  setTable();
}

function setTable() {
  let tbody = document.getElementById('prnIds');
  tbody.innerHTML = createIdsTable();
}

function createIdsTable() {
  let idTable = '';
  const prnIds = caGenerator.g2Taps.map((tuple) => [tuple[0] + 1, tuple[1] + 1]);

  prnIds.forEach((tuple, i) => {
    idTable += `<tr><td>${i + 1}</td>` + 
               `<td>${tuple[0]} & ${tuple[1]}</td></tr>`;
  });
  return idTable;
}

function generate() {
  const prnId = document.getElementById('prnId').value;
  const length = document.getElementById('length').value;
  
  caGenerator.generate(prnId, length);
  let logBox = document.getElementById('log');
  logBox.value = '';
  
  caGenerator.log.forEach( loggy => {
    logBox.value += loggy.lfsr1.state.toString() + '                         ';
    logBox.value += loggy.lfsr1.feed + '           ';
    logBox.value += loggy.lfsr2.state.toString() + '                                   ';
    logBox.value += loggy.lfsr2.feed + '                      ';
    logBox.value += loggy.caSeq + '\n';
  });
}

window.init = init;
window.caGenerator = caGenerator;
window.generate = generate;