const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const outputWindow = document.querySelector(".output");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equal")
const backspaceButton = document.querySelector(".backspace")
const pointButton = document.querySelector(".point")


// AC (all clear) button
clearButton.addEventListener("click", () => {
    outputWindow.textContent = "0";
})

// backspace button
backspaceButton.addEventListener("click", () => {
    if (outputWindow.textContent.length > 1) {
        outputWindow.textContent = outputWindow.textContent.slice(0, -1);
    }
})

// point button

pointButton.addEventListener("click", () => {
    const breakedOutput = outputWindow.textContent.split(/[+\-x÷%]/); // splitting output.Window into 
    // array with deter of various expected operators [+\-x÷%]
    const currentNumber = breakedOutput[breakedOutput.length - 1]; // picking last element of array to check 
    // does it have point already or not

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
        if (outputWindow.textContent.length >= 14) return;
        outputWindow.textContent += button.textContent;
    });
})

// operator buttons
let operatorInput = operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (/[+\-x÷%]$/.test(outputWindow.textContent)) return; // tests if the string ends with 
        // operator, if true stop function from adding inputs
        outputWindow.textContent += button.textContent;
    });

});


const equal = equalsButton.addEventListener("click", () => {

    let aNumber; // output before operator 

    let bNumber; // output after operator




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


});



// basic calculator logic



