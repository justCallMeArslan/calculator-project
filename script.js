const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const outputWindow = document.querySelector(".output");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equal")
const backspaceButton = document.querySelector(".backspace")
const pointButton = document.querySelector(".point")
const percentButton = document.querySelector(".percent")

const MAX_DISPLAY_LENGTH = 19;
let justCalculated = false;


// AC (all clear) button
clearButton.addEventListener("click", () => {
    outputWindow.textContent = "0";
});

// backspace (delete) button
backspaceButton.addEventListener("click", () => {
    if (outputWindow.textContent === "Can't divide by 0") return;
    if (outputWindow.textContent.length <= 1) {
        outputWindow.textContent = "0";
    } else {
        outputWindow.textContent = outputWindow.textContent.slice(0, -1);
    }
});

// point button
pointButton.addEventListener("click", () => {
    const brokenOutput = outputWindow.textContent.split(/[+\-x÷%]/);
    const currentNumber = brokenOutput[brokenOutput.length - 1];
    if (outputWindow.textContent === "Can't divide by 0") return;
    if (/%$/.test(outputWindow.textContent)) return;
    if (currentNumber.includes(".")) return;
    if (currentNumber === "") {
        outputWindow.textContent += "0."
    } else {
        outputWindow.textContent += "."
    }
});

// Number a and b handler
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const display = outputWindow.textContent;
        if (outputWindow.textContent === "Can't divide by 0") return;
        if (/%$/.test(display)) return;

        if (display === "0") {
            outputWindow.textContent = "";
        };
        if (display.length >= MAX_DISPLAY_LENGTH) return;
        if (justCalculated) {
            outputWindow.textContent = button.textContent;
            justCalculated = false;
        } else {
            outputWindow.textContent += button.textContent;
        }
    });
});

// operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        const display = outputWindow.textContent;
        const operator = button.textContent;

        if (display === "") return;
        if (outputWindow.textContent === "Can't divide by 0") return;

        if (/(?<!^)[+\-x÷%]/.test(display) && (/\d$/.test(display))) return;
        if (/[+\-x÷]$/.test(display)) {
            outputWindow.textContent = display.replace(/[+\-x÷]$/, operator);
            return;
        }
        if (/%$/.test(display)) return;

        if (justCalculated) {
            outputWindow.textContent += operator;
            justCalculated = false;
            return;
        }
        outputWindow.textContent += operator;
    })
});

// percent button
percentButton.addEventListener("click", () => {
    if (outputWindow.textContent === "Can't divide by 0") return;
    if (/[+\-x÷%]$/.test(outputWindow.textContent) ||
        outputWindow.textContent === "") return;
    outputWindow.textContent += "%";

})

// computation part
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function toDecimal(a) {
    return a / 100;
};

function percent(a, b, operator) {
    const p = (a * b) / 100;

    switch (operator) {
        case "+":
            return a + p;
        case "-":
            return a - p;
        case "x":
            return a * p;
        case "÷":
            return a / p;
        default:
            return "NaO"
    }
};

// evaluation part
const equal = equalsButton.addEventListener("click", () => {
    justCalculated = true;
    const output = outputWindow.textContent;
    let result;

    // for single number% equals 
    if (output.endsWith("%") && !/[+\-x÷%]/.test(output.slice(0, -1))) {

        const singleNumPercent = Number(output.replace("%", ""));
        result = toDecimal(singleNumPercent);
        outputWindow.textContent = parseFloat(result.toFixed(2));
        return;
    }

    // operator parsing for calculations
    const match = output.match(/(?<!^)([+\-x÷])/);
    if (!match) return;

    const operator = match[1];
    let [aNumString, bNumString] = output.split(operator);
    const aNumber = Number(aNumString);
    let bNumber = Number(bNumString.replace("%", ""));


    // if % used on scond number of equation (binary expression)
    const isPercentPresent = bNumString.includes("%");
    if (isPercentPresent) {
        const bNumberPercent = percent(aNumber, bNumber, operator);
        outputWindow.textContent = parseFloat(bNumberPercent.toFixed(2));
        return;
    }

    // normal arithmetics
    switch (operator) {
        case "+":
            result = add(aNumber, bNumber);
            break;
        case "-":
            result = subtract(aNumber, bNumber);
            break;
        case "x":
            result = multiply(aNumber, bNumber)
            break;
        case "÷":
            if (bNumber === 0) {
                outputWindow.textContent = "Can't divide by 0";
                return;
            }
            result = divide(aNumber, bNumber);
            break;
        default:
            result = "NaO";
    }

    if (typeof result === "string") {
        outputWindow.textContent = result;
    } else {
        outputWindow.textContent = parseFloat(result.toFixed(2));
    }

});


