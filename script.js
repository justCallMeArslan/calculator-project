let aNumber;
let bNumber;
let operator;

function add(a, b) {
    return a + b;
};

function substract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(aNumber, operator, bNumber) {
    switch (operator) {
        case "+":
            return add(aNumber, bNumber);
        case "-":
            return substract(aNumber, bNumber);
        case "x":
            return multiply(aNumber, bNumber);
        case "÷":
            return divide(aNumber, bNumber);
        default:
            return "NaO";
    }

}

console.log(operate(10, "x", 20));

