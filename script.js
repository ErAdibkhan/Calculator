let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

// Append number to display
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) {
        return;
    }
    currentInput += number;
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (currentInput === '') {
        return;
    }
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Calculate result
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === null) {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch(operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Error: Cannot divide by zero';
                currentInput = '';
                previousInput = '';
                operator = null;
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Clear display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Delete last character
function deleteLastChar() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

// Update display
function updateDisplay() {
    display.value = currentInput || '0';
}

// Event listeners for number buttons
document.getElementById('btn-0').addEventListener('click', () => appendNumber('0'));
document.getElementById('btn-1').addEventListener('click', () => appendNumber('1'));
document.getElementById('btn-2').addEventListener('click', () => appendNumber('2'));
document.getElementById('btn-3').addEventListener('click', () => appendNumber('3'));
document.getElementById('btn-4').addEventListener('click', () => appendNumber('4'));
document.getElementById('btn-5').addEventListener('click', () => appendNumber('5'));
document.getElementById('btn-6').addEventListener('click', () => appendNumber('6'));
document.getElementById('btn-7').addEventListener('click', () => appendNumber('7'));
document.getElementById('btn-8').addEventListener('click', () => appendNumber('8'));
document.getElementById('btn-9').addEventListener('click', () => appendNumber('9'));
document.getElementById('btn-dot').addEventListener('click', () => appendNumber('.'));

// Event listeners for operator buttons
document.getElementById('btn-plus').addEventListener('click', () => appendOperator('+'));
document.getElementById('btn-minus').addEventListener('click', () => appendOperator('-'));
document.getElementById('btn-multiply').addEventListener('click', () => appendOperator('*'));
document.getElementById('btn-divide').addEventListener('click', () => appendOperator('/'));
document.getElementById('btn-modulo').addEventListener('click', () => appendOperator('%'));

// Event listeners for action buttons
document.getElementById('btn-equals').addEventListener('click', () => calculate());
document.getElementById('btn-clear').addEventListener('click', () => clearDisplay());
document.getElementById('btn-delete').addEventListener('click', () => deleteLastChar());

// Initialize display
updateDisplay();
