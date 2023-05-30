class Calculator {
    constructor() {
        this.displayValue = "0";
        this.pendingOperand = null;
        this.pendingOperator = null;
        this.initialize();
    }

    initialize() {
        this.display = document.querySelector(".calculator__display-text");
        this.display.textContent = this.displayValue;
        this.setEventListeners();
    }

    setEventListeners() {
        const buttons = document.querySelectorAll(".calculator__button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                this.handleInput(button);
            });
        });
    }

    handleInput(button) {
        const buttonType = button.classList.value;

        if (buttonType.includes("operand")) {
            this.handleOperandInput(button);
        } else if (buttonType.includes("operator")) {
            this.handleOperatorInput(button);
        } else if (buttonType.includes("control")) {
            this.handleControlInput(button);
        }

        this.displayValue = String(roundN(Number(this.displayValue), 10));
        this.display.textContent = this.displayValue;
    }

    handleOperandInput(button) {
        if (this.displayValue.length >= 10) { return; }

        const buttonValue = button.textContent;
        if (button.id === "decimal" && !this.displayValue.includes(".")) {
            this.displayValue += buttonValue;
        } else if (this.displayValue === "0") {
            this.displayValue = buttonValue;
        } else {
            this.displayValue += buttonValue;
        }
    }

    handleOperatorInput(button) {
        if (this.pendingOperand && this.pendingOperator) {
            this.displayValue = String(this.operate(this.pendingOperator, Number(this.pendingOperand), Number(this.displayValue)));
        }

        this.pendingOperator = button.textContent;
        this.pendingOperand = this.displayValue;
        this.displayValue = '0';
    }

    handleControlInput(button) {
        const buttonValue = button.textContent;

        if (buttonValue === "AC") {
            this.displayValue = "0";
            this.pendingOperand = null;
            this.pendingOperator = null;
        } else if (button.id === "equals") {
            if (this.pendingOperand && this.pendingOperator) {
                this.displayValue = String(this.operate(this.pendingOperator, Number(this.pendingOperand), Number(this.displayValue)));
                this.pendingOperand = null;
                this.pendingOperator = null;
            }
        }
    }

    operate(operator, a, b) {
        switch (operator) {
            case "+":
                return this.add(a, b);
            case "-":
                return this.subtract(a, b);
            case "*":
                return this.multiply(a, b);
            case "/":
                return this.divide(a, b);
            default:
                return a;
        }
    }

    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) {
        if (b === 0) { return NaN; } return a / b;
    }
}

function roundN(value, digits) {
    var tenToN = 10 ** digits;
    return (Math.round(value * tenToN)) / tenToN;
}

document.addEventListener("DOMContentLoaded", () => { new Calculator(); });
