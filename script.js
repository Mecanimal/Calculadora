const display = document.getElementById('display');

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
        if(!Number.isNaN(parseFloat(expression.split('root')[1]))) {
            expression = expression.replace('root', '')
            console.log(Math.sqrt(parseFloat(expression)))
            return
        }
    }
    if(String(expression).includes('root')) {
        root(expression)
        return
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
        console.log(expression)
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('minus')
        console.log(parseFloat(leftNumber) - parseFloat(rightNumber))
        return
    }
    if(/\dover|overminus\d/.test(expression)) {
        expression = expression.replace('minus', '-')
        const [leftNumber, rightNumber] = expression.split('over')
        console.log(parseFloat(leftNumber) / parseFloat(rightNumber))
        return
    }
    if(/\dtimes|timesminus\d/.test(expression)) {
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
    console.log(expression)
    const [leftNumber, rightNumber] = expression.split('+')
    console.log(parseFloat(leftNumber) + parseFloat(rightNumber))
}

function root(expression) {
    console.log(expression)
    expression = expression.replace('root', '')
    const [leftNumber, rightNumber] = expression.split('+')
    expression = Math.sqrt(parseFloat(leftNumber)).toString() + '+' + rightNumber.toString()
    stringReader(expression)
}