const display = document.getElementById('display');
//array de operações
const operations = [ '+', 'minus', 'over', 'times', 'powerof'] 

let currentValue = ''

//função para limpar o display
function clear() {
    currentValue = ''
    expression = ''
    display.value = ''
}

//função para digitar algo
function keyPress(id) {
    if(id === '=') {
        stringReader(currentValue)
        return
    }
    if(id === 'c') {
        clear()
        return
    }
    display.value += id
    const value = document.getElementById(id).value; 
    currentValue += value
}

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
        } else {}
    }
    if(String(expression).startsWith('minus')) {
        expression = expression.replace('minus', '-')
    }
    if(/\dminus|minusminus\d/.test(expression)) {
        if(expression.includes('minusminus')) {
            expression = expression.replace('minusminus', '+')
            add(expression)
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
        expression = expression.replace('root', '')
        const [leftNumber, rightNumber] = expression.split(op)
        if(rightNumber)
        expression = Math.sqrt(parseFloat(leftNumber)).toString() + op.toString() + rightNumber.toString()
        return expression
    }
    return expression
}
