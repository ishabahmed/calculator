class Calculator {
    constructor() {
        this.displayValue = 0;
        this.initialize();
    }

    initialize() {
        this.display = document.querySelector("#display-text");
        this.display.textContent = this.displayValue;
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
        }
    }
}