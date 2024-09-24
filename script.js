document.addEventListener('DOMContentLoaded', function() {
    const displayCalculation = document.querySelector('.displayCalculation');
    const displayAnswer = document.querySelector('.displayAnswer');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent.trim();

            if (value === 'AC') {
                clearAll();
            } else if (value === 'del') {
                deleteLast();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '×', '÷', '%'].includes(value)) {
                setOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    function clearAll() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function calculate() {
        let result;
        const current = parseFloat(currentInput);
        const previous = parseFloat(previousInput);

        if (isNaN(current) || isNaN(previous)) return;

        switch (operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '×':
                result = previous * current;
                break;
            case '÷':
                result = previous / current;
                break;
            case '%':
                result = previous % current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    function setOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    }

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        updateDisplay();
    }

    function updateDisplay() {
        displayCalculation.textContent = previousInput + ' ' + operator + ' ' + currentInput;
        displayAnswer.textContent = currentInput;
    }

    // Clear display on load
    clearAll();
});