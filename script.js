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
        if (outputWindow.textContent === "0") {
            outputWindow.textContent = "";
        };
        if (outputWindow.textContent.length >= 19) return;
        outputWindow.textContent += button.textContent;
    });
})

// operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (/[+\-x÷%]$/.test(outputWindow.textContent)) return; // tests if the string ends with 
        // operator, if true stop function from adding inputs
        outputWindow.textContent += button.textContent;
    });

});


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
            return p === 0 ? "Can't divide by 0" : a / p;
        default:
            return "NaO"
    }


};


const equal = equalsButton.addEventListener("click", () => {
    const output = outputWindow.textContent

    const numSplitted = output.split(/[+\-x÷%]/);
    const aNumber = Number(numSplitted[0]);
    let bNumber = Number(numSplitted[1]);

    // before % clicked if it will be clicked at all
    const match = output.match(/[+\-x÷%]/);
    if (!match) return;
    const operator = match[0];

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
            result = bNumber === 0 ? "Error" : multiply(aNumber, bNumber);
            break;
        case "÷":
            result = bNumber === 0 ? 0 : divide(aNumber, bNumber);
            break;
        default:
            result = "NaO";
    }

    outputWindow.textContent = Math.round(result * 100) / 100;
});


