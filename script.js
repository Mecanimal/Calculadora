//consertar bug de subtração com números decimais negativos
//consertar bug de multiplicação com número salvo

const display = document.getElementById('display');
//array de operações
const operations = [ '+', 'minus', 'over', 'times', 'powerof'] 

let power = 'off'
let currentValue = ''
let memory = ''
let currentSymbol= ''
let currentOperation= ''

//função para digitar algo
function keyPress(id) {
    if(id === 'toggle') {
        onoff()
        return
    }
    if(power === 'off') {
        return
    }
    if(id === '=') {
        stringReader(currentValue)
        return
    }
    if(id === 'c') {
        display.value = ''
        currentValue = ''
        return
    }
    if(id === 'b') {
        backSpace(currentValue)
        return
    }
    if(id === 'save') {
        memory = currentValue
        return
    }
    if(id === 'load') {
        let displayShadow = ''
        const operationMap = {
            'minus': '-',
            'over': '/',
            'times': '*',
            'powerof': '**'
        }
        displayShadow = currentValue.toString() + memory.toString();
        for (const [writtenForm, symbol] of Object.entries(operationMap)) {
            display.value = displayShadow.replaceAll(writtenForm, symbol);
        }
        return
    }
    display.value += id
    const thisvalue = document.getElementById(id)?.value
    currentValue += thisvalue
}

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

function backSpace(str) {
    if(str.length == 0) {
        display.value = ''
        return
    }
    str = str.slice(0, -1)
    display.value = str
    currentValue = str
}

//função para limpar o display

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
        expression = root(expression, 'minus', '-')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('-')
        result = (parseFloat(leftNumber) - parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    if(/\dover|overminus\d/.test(expression)) {
        expression = root(expression, 'over', '/')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('over')
        result = (parseFloat(leftNumber) / parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    if(/\dtimes|timesminus\d/.test(expression)) {
        expression = root(expression, 'times', '*')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('times')
        result = (parseFloat(leftNumber) * parseFloat(rightNumber))
        equalsTo(result)
        return
    }
    if(/\dpowerof|powerofminus\d/.test(expression)) {
        expression = root(expression, 'powerof', '**')
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
    expression = root(expression, '+', '+')
    const [leftNumber, rightNumber] = expression.split('+')
    result = (parseFloat(leftNumber) + parseFloat(rightNumber))
    equalsTo(result)
}

function root(expression, op, sy) {
    currentOperation = op
    currentSymbol = sy
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

function equalsTo(result) {
    if(!isNaN(result)) {
        currentValue = result
        display.value = currentValue
    } else {

    }
}