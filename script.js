//consertar bug de subtração com números decimais negativos!

const display = document.getElementById('display');

//arrays de operações
const operations = [ '+', 'minus', 'over', 'times', 'powerof']
const symbols = [ '+', '-', '/', '*', '^']
const operationMap = {
    'minus': '-',
    'over': '/',
    'times': '*',
    'powerof': '**'
}

let power = 'off'
let currentValue = ''
let memory = ''

//função para digitar algo
function keyPress(id) {
    //ligar e desligar
    if(id === 'toggle') {
        onoff()
        return
    }
    if(power === 'off') {
        return
    }
    //função para resolver a expressão
    if(id === '=') {
        stringReader(currentValue)
        return
    }
    //limpar a tela
    if(id === 'c') {
        display.value = ''
        currentValue = ''
        return
    }
    //apagar um dígito
    if(id === 'b') {
        backSpace(currentValue)
        return
    }
    //salvar na memória
    if(id === 'save') {
        memory = currentValue
        return
    }
    //carregar valor salvo
    if(id === 'load') {
        let displayShadow = ''
        currentValue = currentValue.toString() + memory.toString();
        displayShadow = currentValue
        for (const [writtenForm, symbol] of Object.entries(operationMap)) {
            displayShadow = displayShadow.replaceAll(writtenForm, symbol);
            display.value = displayShadow
        }
        return
    }
    //checar se o bagulho faz aquilo (sla)
    if(symbols.some((operation) => id == operation)) {
        if(!currentValue === '') {
            console.log('Sebastião Marçal')
        }
    }
    //atualizar o valor
    display.value += id
    const thisvalue = document.getElementById(id)?.value
    currentValue += thisvalue
}

//função para ligar e desligar
function onoff() {
    if(power === 'off') {
        power = 'on'
        display.placeholder='0'
    } else {
        power = 'off'
        display.placeholder=''
        display.value = ''
        currentValue = ''
        memory = ''
    }
}

//função para apagar
function backSpace(str) {
    if(str.length == 0) {
        display.value = ''
        return
    }
     for (const [writtenForm, symbol] of Object.entries(operationMap)) {
        str = str.replaceAll(writtenForm, symbol);
    }
    str = str.slice(0, -1);
    display.value = str;
    for (const [symbol, writtenForm] of Object.entries(operationMap)) {
        str = str.replaceAll(symbol, writtenForm);
    }
    currentValue = str;
}

//função para resolver a expressão
/**
 * 
 * @param {String} expression 
 */
function stringReader(expression) {
    let result = ''
    if(/root\d/.test(expression)) {
        if(!operations.some((operation) => expression.includes(operation))) {
            expression = expression.replace('root', '')
            result = (Math.sqrt(parseFloat(expression)))
            equalsTo(result)
            return
        }
    }
    if(String(expression).startsWith('minus') && !/minus\dminus/.test(expression)) {
        expression = expression.replace('minus', '-')
    }
    if(/\dminus|minusminus\d/.test(expression)) {
        if(expression.includes('minusminus')) {
            expression = expression.replace('minusminus', '+')
            if(/minus\d/.test(expression)) {
                const [leftNumber, rightNumber] = expression.split('+')
                expression = rightNumber + '+' + leftNumber
                expression = expression.replace('minus', '-')
            }
            add(expression)
            return
        }
        if(/minus\dminus/.test(expression)) {
            expression = expression.replace('minus', '-')
            const [leftNumber, rightNumber] = expression.split('minus')
            result = (parseFloat(leftNumber) - parseFloat(rightNumber))
            equalsTo(result)
            return
        }
        expression = root(expression, 'minus')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('-')
        result = (parseFloat(leftNumber) - parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    if(/\dover|overminus\d/.test(expression)) {
        expression = root(expression, 'over')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('over')
        result = (parseFloat(leftNumber) / parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    if(/\dtimes|timesminus\d/.test(expression)) {
        expression = root(expression, 'times')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('times')
        result = (parseFloat(leftNumber) * parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    if(/\dpowerof|powerofminus\d/.test(expression)) {
        expression = root(expression, 'powerof')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('powerof')
        result = (parseFloat(leftNumber) ** parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    expression = expression.replace('minus', '-')
    add(expression)
}

//função para somar
function add(expression) {
    expression = root(expression, '+')
    const [leftNumber, rightNumber] = expression.split('+')
    result = (parseFloat(leftNumber) + parseFloat(rightNumber))
    equalsTo(result)
}

//função para fazer raízes quadradas
function root(expression, op,) {
    if(expression.includes('root')) {
        let [leftNumber, rightNumber] = expression.split(op)
        console.log(leftNumber, rightNumber)
        if(rightNumber.includes('root')){
            const eastNumber = rightNumber.replace('root', '')
            if(leftNumber.includes('root')) {
                const westNumber = leftNumber.replace('root', '')
                expression = Math.sqrt(parseFloat(westNumber)).toString() + op.toString() + Math.sqrt(parseFloat(eastNumber)).toString()
                return expression
            } 
            expression = leftNumber.toString() + op.toString() + Math.sqrt(parseFloat(eastNumber)).toString()
            return expression
        }
        leftNumber = leftNumber.replace('root', '')
        expression = Math.sqrt(parseFloat(leftNumber)).toString() + op.toString() + rightNumber.toString()
        return expression
    }
    return expression
}

//função para permitir o display de um resultado
function equalsTo(result) {
    if(!isNaN(result)) {
        currentValue = result
        display.value = currentValue
    }
}