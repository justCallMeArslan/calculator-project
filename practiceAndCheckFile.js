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

function toDecimal(a) {
    return a / 100;
}

// case 1
let output = "-5+5%";
// case 2 
// let output = "5%";


// before % clicked if it will be clicked at all
const match = output.match(/(?<!^)([+\-x÷%])/);
console.log(match);
const operator = match[1]



console.log(operator);



let [aNumString, bNumString] = output.split(operator);
const aNumber = Number(aNumString);
console.log(aNumber);
let bNumber = Number(bNumString.replace("%", "")); // if % present 



// if % used
const isPercentPresent = bNumString.includes("%");
const isDigitWithPercent = output.includes("%");

console.log(isPercentPresent);

if (isPercentPresent) {
    const result = percent(aNumber, bNumber, operator);
    console.log(result);
    return
}

if (isDigitWithPercent) {
    const result = toDecimal(aNumber);
    console.log(result);
    return;
}