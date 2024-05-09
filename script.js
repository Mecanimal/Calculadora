const display = document.getElementById('display');

let on = 0;
let operation = 0;
let equals = 0;
let currentValue = '';
let operationValue = '';
let operationSymbol = '';
let newValue = '';

// Função pra ligar e desligar
function onOff() {
if(on == 0){
    on = 1
    display.placeholder = '0'
} else {
    cPress()
    on = 0
    display.placeholder = ''
    display.value = ''
}
}

// botão que reseta
function cPress() { if(on == 1){
    display.value = '';
    currentValue = '';
    operation = '';
    operationValue = '';
}
}

// função para escrever os números
function keyPress(id) { if(on == 1){
if(equals == 1 & operation == 0) {
    equals = 0
    cPress()
}
if(operation == 0) {
    newValue = parseFloat(currentValue.toString() + id);
    display.value = newValue;
    console.log(newValue , id);
} else {
    newValue = currentValue.toString();
    console.log(operationValue.toString() , id.toString())
    let newOperationValue = parseFloat(operationValue.toString() + id.toString());
    display.value = newValue.toString() + operationSymbol + newOperationValue.toString();
    operationValue = newOperationValue;
}
currentValue = newValue;
}
}

// função para fazer operações
function operationPress(id) { if(on == 1){
    if(operation == '1' & operationValue != 0) {
        equalsTo()
    }
    operation = 1;
    operationSymbol = id;
    display.value = currentValue.toString() + operationSymbol;
}
}

// função para fazer a conta
function equalsTo() { if(on == 1){
if(operationValue !== ''){
    operation = 0;
    equals = 1;
if(operationSymbol == '+') {
    newValue = parseFloat(currentValue) + parseFloat(operationValue)
} else { if(operationSymbol == '-') {
    newValue = parseFloat(currentValue) - parseFloat(operationValue)
} else { if(operationSymbol == '*') {
    newValue = parseFloat(currentValue) * parseFloat(operationValue)
} else { if(operationValue === 0) {
    newValue = 'Error'
} else {
    newValue = parseFloat(currentValue) / parseFloat(operationValue)
}
}
}
}
} else {
    operationValue = '';
}
    currentValue = newValue;
    display.value = newValue;
    operationValue = '';
}
}