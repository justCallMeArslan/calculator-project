const digitButtons = document.querySelectorAll(".digits");
const outputWindow = document.querySelector(".output");
const clearButton = document.querySelector(".clear")

console.log([digitButtons].textContent);
console.log(outputWindow.textContent);



let aNumber = digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (outputWindow.textContent === "0") {
            outputWindow.textContent = "";
        };
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

let operator;

function clearOutput () {
    clearButton.addEventListener("click", ()=> {
        outputWindow.textContent = "0";
    })
} 
clearOutput();


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

console.log(operate(aNumber, "x", bNumber));

