const display = document.getElementById('display');
//array de operações
const operations = [ '+', 'minus', 'over', 'times'] 

let currentValue = ''

// função para digitar algo
function keyPress(id) {
    if(id === '=') {
        stringReader(currentValue)
        return
    }
    display.value += id
    const value = document.getElementById(id).value; 
    currentValue += value
}

// função para resolver a expressão
/**
 * 
 * @param {String} expression 
 */
function stringReader(expression) {
    if(/root\d/.test(expression)) {
        if(!operations.some((operation) => expression.includes(operation))) {
            expression = expression.replace('root', '')
            console.log(Math.sqrt(parseFloat(expression)))
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
        console.log(parseFloat(leftNumber) - parseFloat(rightNumber))
        return
    }
    if(/\dover|overminus\d/.test(expression)) {
        expression = root(expression, 'over')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('over')
        console.log(parseFloat(leftNumber) / parseFloat(rightNumber))
        return
    }
    if(/\dtimes|timesminus\d/.test(expression)) {
        expression = root(expression, 'times')
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('times')
        console.log(parseFloat(leftNumber) * parseFloat(rightNumber))
        return
    }
    expression = expression.replace('minus', '-')
    add(expression)
}

// função para somar
function add(expression) {
    expression = root(expression, '+')
    const [leftNumber, rightNumber] = expression.split('+')
    console.log(parseFloat(leftNumber) + parseFloat(rightNumber))
}

function root(expression, op) {
    if(expression.includes('root')) {
        expression = expression.replace('root', '')
        const [leftNumber, rightNumber] = expression.split(op)
        expression = Math.sqrt(parseFloat(leftNumber)).toString() + op.toString() + rightNumber.toString()
        return expression
    }
    return expression
}
