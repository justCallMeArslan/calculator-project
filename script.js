const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const outputWindow = document.querySelector(".output");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equal")
const backspaceButton = document.querySelector(".backspace")
const pointButton = document.querySelector(".point")
const percentButton = document.querySelector(".percent")



// AC (all clear) button
clearButton.addEventListener("click", () => {
    outputWindow.textContent = "0";
})

// backspace button
backspaceButton.addEventListener("click", () => {
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

        if (/%$/.test(display)) return;

        if (display === "0") {
            outputWindow.textContent = "";
        };

        if (display.length >= 19) return;
        outputWindow.textContent += button.textContent;
    });
})

// operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        const display = outputWindow.textContent;
        const operator = button.textContent;

        if (display === "") return;

        if (/[+\-x÷%]/.test(display) && (/\d$/.test(display))) return; // checks entire display 
        // if operator already exists AND if last number operator or number, if last is number 
        // and operator already exists -> block another operators

        if (/[+\-x÷]$/.test(display)) { //[RegExp]$ where $ tells that we check last operator
            outputWindow.textContent = display.replace(/[+\-x÷]$/, operator); // replacing operator
            // for another if user misclicked and chose wrong 
            return;
        }

        if (/%$/.test(display)) return;


        outputWindow.textContent += operator; //adds last clicked operator

    })
});

// percent button

percentButton.addEventListener("click", () => {
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
            return p === 0 ? 0 : a / p;
        default:
            return "NaO"
    }
};

function aNumbPercent(a) {
    return a / 100;
}

const equal = equalsButton.addEventListener("click", () => {
    const output = outputWindow.textContent

    // before % clicked if it will be clicked at all
    const match = output.match(/[+\-x÷%]/);
    if (!match) return;
    const operator = match[0];

    let [aNumString, bNumString] = output.split(operator);
    const aNumber = Number(aNumString);
    let bNumber = Number(bNumString.replace("%", "")); // if % present 



    // if % used
    const isPercentPresent = output.includes("%");
    if (isPercentPresent) {
        const result = percent(aNumber, bNumber, operator);
        outputWindow.textContent = Math.round(result * 100) / 100;
        return;
    }

    let result;

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
            result = bNumber === 0 ? "Can't divide by 0" : divide(aNumber, bNumber);
            break;
        default:
            result = "NaO";
    }

    if (typeof result === "string") {
        outputWindow.textContent = result;
    } else {
        outputWindow.textContent = Math.round(result * 100) / 100;
    }

});


