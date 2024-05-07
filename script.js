const display = document.getElementById('display');
const one = document.getElementById('1');
const c = document.getElementById('C');

let currentValue = 0;
let operation = 0;
let operationValue = 0;

function cPress() {
    display.value = 0
    currentValue = 0
}

function keyPress(id) {
if(operation == 0) {
    let newValue = parseFloat(currentValue.toString() + id.toString());
    display.value = newValue;
    currentValue = newValue;
} else {
    let newOperationValue = parasefloat(operationValue.toString() + id.toString())
    display.value = newValue.toString + operationSimbol.toString + newOperationValue.toString
}
}

function operationPress(id) {
    operation = 1
    let operationSimbol = id
    display.value = parseFloat(newValue.toString + operationSimbol)
}

c.addEventListener('click', cPress);