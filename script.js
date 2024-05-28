//consertar bug de subtração com numeros decimais negativos

const display = document.getElementById('display');
//array de operações
const operations = [ '+', 'minus', 'over', 'times', 'powerof'] 

let power = 'off'
let currentValue = ''
let memory = ''

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
        currentValue = currentValue.toString() + memory.toString()
        display.value = currentValue
        return
    }
    display.value += id
    const thisvalue = document.getElementById(id)?.value; 
    currentValue += thisvalue
}

function onoff() {
    if(power === 'off') {
        power = 'on'
        
    } else {
        power = 'off'
        display.value = ''
        currentValue = ''
    }
}

function backSpace(str) {
    if(str.length == 0) {
    display.value = 0
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
    if(/root\d/.test(expression)) {
        if(!operations.some((operation) => expression.includes(operation))) {
            expression = expression.replace('root', '')
            currentValue = (Math.sqrt(parseFloat(expression)))
            display.value = currentValue
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
            currentValue = (parseFloat(leftNumber) - parseFloat(rightNumber))
            display.value = currentValue
            return
        }
        expression = root(expression, 'minus')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('-')
        currentValue = (parseFloat(leftNumber) - parseFloat(rightNumber))
        display.value = currentValue
        return
    }
    if(/\dover|overminus\d/.test(expression)) {
        expression = root(expression, 'over')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('over')
        currentValue = (parseFloat(leftNumber) / parseFloat(rightNumber))
        display.value = currentValue
        return
    }
    if(/\dtimes|timesminus\d/.test(expression)) {
        expression = root(expression, 'times')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('times')
        currentValue = (parseFloat(leftNumber) * parseFloat(rightNumber))
        display.value = currentValue
        return
    }
    if(/\dpowerof|powerofminus\d/.test(expression)) {
        expression = root(expression, 'powerof')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('powerof')
        currentValue = (parseFloat(leftNumber) ** parseFloat(rightNumber))
        display.value = currentValue
        return
    }
    expression = expression.replace('minus', '-')
    add(expression)
}

//função para somar
function add(expression) {
    expression = root(expression, '+')
    const [leftNumber, rightNumber] = expression.split('+')
    currentValue = (parseFloat(leftNumber) + parseFloat(rightNumber))
    display.value = currentValue
}

function root(expression, op) {
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
