class Calculator {
    constructor() {
        this.displayValue = "0";
        this.result = 0;
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

        this.display.textContent = this.displayValue;
    }

    handleOperandInput(button) {
        if (this.displayValue.length >= 10) { return; }

        const buttonValue = button.textContent;

        if (button.id === "decimal") {
            if (!this.displayValue.includes(".")) {
                this.displayValue += buttonValue;
            }
        } else {
            if (this.displayValue == "0") {
                this.displayValue = buttonValue;
            } else {
                this.displayValue += buttonValue;
            }
        }
    }

    handleControlInput(button) {
        const buttonValue = button.textContent;

        if (buttonValue === "AC") {
            this.displayValue = "0";
            this.result = 0;
        }
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b == 0) {
            return "Error: Cannot divide by zero";
        }
        return a / b;
    }

    operate(operator, a, b) {
        switch (operator) {
            case "+":
                return add(a, b);
            case "-":
                return subtract(a, b);
            case "x":
                return multiply(a, b);
            case "/":
                return divide(a, b);
            case "=":
                return a;
        }
    }
}

/* when dom ready */
document.addEventListener("DOMContentLoaded", () => { new Calculator(); });
