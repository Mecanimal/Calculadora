const display = document.getElementById('display');

let currentValue = ''

function keyPress(id) {
    if(id === '=') {
        stringReader(currentValue)
        return
    }
    display.value += id
    const value = document.getElementById(id).value; 
    currentValue += value
}

// função para somar dois números naturais
/**
 * 
 * @param {String} expression 
 */
function stringReader(expression) {
    expression = String(expression)
    if(/(?=\d)+(?=\d)/.test(expression)) {
        const [leftNumber, rightNumber] = expression.split('+')
        console.log(parseFloat(leftNumber) + parseFloat(rightNumber))
    }
    if(/\dminus\d/.test(expression)) {
        const [leftNumber, rightNumber] = expression.split('minus')
        console.log(leftNumber, rightNumber)
        console.log(parseFloat(leftNumber) - parseFloat(rightNumber))
    }
}