const display = document.getElementById('display');
const one = document.getElementById('1');
const c = document.getElementById('C');

let on = 0;
let currentValue = 0;
let operation = 0;
let operationValue = 0;
let operationSymbol = "";
let newValue = 0;

// botão pra ligar
function onOff() {
if(on == 0){
    on = 1
    display.placeholder = '0'
} else {on = 0}
}

// botão que reseta
function cPress() {
    display.value = 0;
    currentValue = 0;
    operation = 0;
    operationValue = 0;
}

// função para escrever os números
function keyPress(id) {
if(operation == 0) {
    newValue = parseFloat(currentValue.toString() + id.toString());
    display.value = newValue;
} else {
    newValue = parseFloat(currentValue.toString());
    console.log(operationValue.toString() , id.toString())
    let newOperationValue = parseFloat(operationValue.toString() + id.toString());
    display.value = newValue.toString() + operationSymbol + newOperationValue.toString();
    operationValue = newOperationValue;
}
currentValue = newValue;
}

// função para fazer operações
function operationPress(id) {
    if(operation == '1' & operationValue != 0) {
        equalsTo()
    }
    operation = 1;
    operationSymbol = id;
    display.value = currentValue.toString() + operationSymbol;
    keyPress()
}

// função para fazer a conta
function equalsTo() {
    operation = 0;
if(operationSymbol == '+') {
    newValue = parseFloat(currentValue) + parseFloat(operationValue)
} else { if(operationSymbol == '-') {
    newValue = parseFloat(currentValue) - parseFloat(operationValue)
} else { if(operationSymbol == '*') {
    newValue = parseFloat(currentValue) * parseFloat(operationValue)
} else {
    newValue = parseFloat(currentValue) / parseFloat(operationValue)
}
}
}
    currentValue = newValue;
    display.value = newValue;
    operationValue = 0;
}