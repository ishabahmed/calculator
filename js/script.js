/**
 * Calculator class to handle calculator operations
 */
class Calculator {
    constructor() {
        this.displayValue = '0';
        this.pendingOperand = null;
        this.pendingOperator = null;
        this.initialize();
    }

    initialize() {
        this.display = document.querySelector('.calculator__display-text');
        this.display.textContent = this.displayValue;
        this.setEventListeners();
    }

    setEventListeners() {
        const buttons = document.querySelectorAll('.calculator__button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleInput(button));
        });
    }

    handleInput(button) {
        const { classList, textContent, id } = button;
        if (classList.contains('calculator__button--operand')) {
            this.handleOperandInput(textContent, id);
        } else if (classList.contains('calculator__button--operator')) {
            this.handleOperatorInput(textContent);
        } else if (classList.contains('calculator__button--control')) {
            this.handleControlInput(textContent, id);
        }

        this.displayValue = this.roundN(Number(this.displayValue), 10).toString();
        this.display.textContent = this.displayValue;
    }

    handleOperandInput(buttonValue, buttonId) {
        if (this.displayValue.length >= 10) { return; }
        if (buttonId === 'decimal' && !this.displayValue.includes('.')) {
            this.displayValue += buttonValue;
        } else if (this.displayValue === '0') {
            this.displayValue = buttonValue;
        } else {
            this.displayValue += buttonValue;
        }
    }

    handleOperatorInput(buttonValue) {
        if (this.pendingOperand && this.pendingOperator) {
            this.displayValue = this.operate(this.pendingOperator, Number(this.pendingOperand), Number(this.displayValue)).toString();
        }

        this.pendingOperator = buttonValue;
        this.pendingOperand = this.displayValue;
        this.displayValue = '0';
    }

    handleControlInput(buttonValue, buttonId) {
        if (buttonValue === 'AC') {
            this.displayValue = '0';
            this.pendingOperand = null;
            this.pendingOperator = null;
        } else if (buttonId === 'equals' && this.pendingOperand && this.pendingOperator) {
            this.displayValue = this.operate(this.pendingOperator, Number(this.pendingOperand), Number(this.displayValue)).toString();
            this.pendingOperand = null;
            this.pendingOperator = null;
        }
    }

    operate(operator, a, b) {
        switch (operator) {
            case '+':
                return this.add(a, b);
            case '-':
                return this.subtract(a, b);
            case '*':
                return this.multiply(a, b);
            case '/':
                return this.divide(a, b);
            default:
                return a;
        }
    }

    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return b !== 0 ? a / b : NaN; }
    roundN(value, digits) { return Math.round(value * 10 ** digits) / 10 ** digits; }
}

document.addEventListener('DOMContentLoaded', () => new Calculator());