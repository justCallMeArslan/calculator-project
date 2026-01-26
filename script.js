const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const outputWindow = document.querySelector(".output");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equal")


console.log([digitButtons].textContent);
console.log(outputWindow.textContent);

clearButton.addEventListener("click", () => {
    outputWindow.textContent = "0";
})


let aNumber = digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (outputWindow.textContent === "0") {
            outputWindow.textContent = "";
        };
        if (outputWindow.textContent.length >= 12) return;
        outputWindow.textContent += button.textContent;
    });
})



let bNumber;

// let bNumber = digitButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         if (outputWindow.textContent === "0") {
//             outputWindow.textContent = "";
//         };
//         outputWindow.textContent += button.textContent;
//     });
// })

let operatorInput = operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (/[+\-x÷%]$/.test(outputWindow.textContent)) return; // tests if the string ends with 
        // operator, if true stop function from adding inputs
        outputWindow.textContent += button.textContent;
    });

});


const equal = equalsButton.addEventListener("click", () => {
    outputWindow.textContent += "=" + operate(aNumber, operatorInput, bNumber);
});


console.log(equal);

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



