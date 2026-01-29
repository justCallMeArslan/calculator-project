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
})

// backspace button
backspaceButton.addEventListener("click", () => {
    if (outputWindow.textContent === "Can't divide by 0") return;
    if (outputWindow.textContent.length <= 1) {
        outputWindow.textContent = "0";
    } else {
        outputWindow.textContent = outputWindow.textContent.slice(0, -1);
    }
})
// point button

pointButton.addEventListener("click", () => {
    const brokenOutput = outputWindow.textContent.split(/[+\-x÷%]/); // splitting output.Window into 
    // array with deter of various expected operators [+\-x÷%]
    const currentNumber = brokenOutput[brokenOutput.length - 1]; // picking last element of array to 
    // check: does it have point already or not?!
    if (outputWindow.textContent === "Can't divide by 0") return;
    if (/%$/.test(outputWindow.textContent)) return;
    if (currentNumber.includes(".")) return; // if last number of array already have ., we return 
    // and stop 

    if (currentNumber === "") {
        outputWindow.textContent += "0."
    } else {
        outputWindow.textContent += "."
    }

})

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
            outputWindow.textContent = button.textContent; // assigns new digit to outputWindow, 
            // if true (after = happens)
            justCalculated = false; // reset state back to normal
        } else {
            outputWindow.textContent += button.textContent;
        }

    });
})

// operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        const display = outputWindow.textContent;
        const operator = button.textContent;

        if (display === "") return;

        if (outputWindow.textContent === "Can't divide by 0") return;


        if (/(?<!^)[+\-x÷%]/.test(display) && (/\d$/.test(display))) return; // checks entire display 
        // if operator already exists AND if last number operator or number, if last is number 
        // and operator already exists -> block another operators ((?<!^) ignores operator at start 
        // of the string)

        if (/[+\-x÷]$/.test(display)) { //[RegExp]$ where $ tells that we check last operator
            outputWindow.textContent = display.replace(/[+\-x÷]$/, operator); // replacing operator
            // for another if user misclicked and chose wrong 
            return;
        }

        if (/%$/.test(display)) return; // if % is the last inout, stops from operating and inputing 
        // another operator

        if (justCalculated) { // if not included justCalculated going to stay in true state and 
            // will wait for digit (as only one possible way to reset state to false, apart from AC), 
            // which breaks normal operational behavior of calculator
            outputWindow.textContent += operator; // appends operator to prevent it to be used as 
            // a tumbler for justCalculated = false on first click
            justCalculated = false; // stops checks
            return;
        }
        outputWindow.textContent += operator; //adds last clicked operator

    })
});

// percent button

percentButton.addEventListener("click", () => {
    if (outputWindow.textContent === "Can't divide by 0") return;
    if (/[+\-x÷%]$/.test(outputWindow.textContent) ||
        outputWindow.textContent === "") return;
    outputWindow.textContent += "%";

})


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


const equal = equalsButton.addEventListener("click", () => {
    justCalculated = true;
    const output = outputWindow.textContent;
    let result;

    // for single number% equals 
    if (output.endsWith("%") && !/[+\-x÷%]/.test(output.slice(0, -1))) { // if string value ends with %, 
        // but doesnt have operators proceed with replace in order to get number for calculation
        const singleNumPercent = Number(output.replace("%", ""));
        result = toDecimal(singleNumPercent);
        outputWindow.textContent = parseFloat(result.toFixed(2));
        return; //to end this operation
    }

    // operator parsing for calculations
    const match = output.match(/(?<!^)([+\-x÷])/); // ignoring first operator, to avoid pulling - 
    // if negative
    if (!match) return;
    
    const operator = match[1];
    let [aNumString, bNumString] = output.split(operator);
    const aNumber = Number(aNumString);
    let bNumber = Number(bNumString.replace("%", "")); // if % present 


    // if % used on scond number of equation (binary expression)
    const isPercentPresent = bNumString.includes("%");
    if (isPercentPresent) {
        const bNumberPercent = percent(aNumber, bNumber, operator);
        outputWindow.textContent = parseFloat(bNumberPercent.toFixed(2));
        return;
    }

    // normal arithmetic

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


