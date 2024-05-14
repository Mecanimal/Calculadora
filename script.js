const display = document.getElementById('display');

let on = 0;
let operation = 0;
let equals = 0;
let currentValue = '';
let operationValue = '';
let operationSymbol = '';
let newValue = '';
let memory = ''

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

// função que apaga
function backspacePress() {
    const newDisplay0 = display.value.slice(0, -1)
    currentValue = newDisplay0
    display.value = currentValue
    newValue = currentValue
}

// função que coloca ponto
function dotPress() { if(on == 1){
    if(operation == 0) {
    const newDisplay1 = display.value + '.'
    currentValue = newDisplay1
    display.value = currentValue
    newValue = currentValue
} else {
    const newDisplay2 = display.value + '.'
    newOperationValue = operationValue + '.'
    display.value = newDisplay2
    operationValue = newOperationValue
}
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
    let newOperationValue = operationValue.toString() + id.toString();
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
    if(equals == 1 & operationSymbol == '√') {
        cPress()
    }
    operation = 1;
    operationSymbol = id;
    display.value = newValue.toString() + operationSymbol;
    currentValue = newValue
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
} else { if(operationSymbol == '√') {
    if(currentValue != '') {
    newValue = parseFloat(currentValue) * Math.sqrt(parseFloat(operationValue))
    } else {
    newValue = Math.sqrt(parseFloat(operationValue))
    }
} else { if(operationSymbol == '^') {
    newValue = parseFloat(currentValue) ** parseFloat(operationValue)
} else { if(operationValue === 0) {
    newValue = 'Error'
} else { 
    newValue = parseFloat(currentValue) / parseFloat(operationValue)
}
}
}
}
}
}
} else {
    operationValue = '';
}
    currentValue = newValue;
    currentValue = (Math.floor(newValue * 10 ** 10))/10 ** 10
    display.value = currentValue;
    operationValue = '';
}
}

// botão para salvar valor
function save() {
    memory = newValue
}

// botão para carregar valor
function load() {
    if(operation == 1) {
    operationValue = memory.toString()
    display.value = newValue.toString() + operationSymbol + operationValue.toString();
    } else {
    const loadDisplay = display.value + memory.toString()
    currentValue = loadDisplay
    display.value = currentValue
    newValue = currentValue
    }
}