'use strict';

import {
    display,
    resetButton,
    backspaceButton,
    digits,
    operators,
    equals
} from './view.js';

let a;
let b;
let operator;

for (let operator of operators) {
    operator.addEventListener('click', addOperator);
}

for (let digit of digits) {
    digit.addEventListener('click', addDigit);
}

equals.addEventListener('click', parseString);
resetButton.addEventListener('click', reset);
backspaceButton.addEventListener('click', erase);


function parseString() {
    let charPosition = '';
    for (let char of display.textContent) {
        if (!isFinite(char)) {
            charPosition = display.textContent.indexOf(char);
        }
    }
    a = Number(display.textContent.slice(0, [charPosition]));
    b = Number(display.textContent.slice([charPosition + 1]));
    operator = display.textContent[charPosition];
    if (operator === '÷') operator = 'div';
    if (operator === '×') operator = 'mult';
    if (operator === '-') operator = 'sub';
    if (operator === '+') operator = 'sum';
    Calc(operator, a, b);
}

function addOperator() {
    if (display.textContent.includes('÷') || display.textContent.includes('×') || display.textContent.includes('-') || display.textContent.includes('+')) {
        return;
    } else {
        display.textContent += this.textContent;
    }
}

function addDigit() {
    if (display.textContent === '0') {
        display.textContent = this.textContent;
    } else {
        display.textContent += this.textContent;
    }

}

function reset() {
    display.textContent = '0';
}

function erase() {
    display.textContent = display.textContent.slice(0, [display.textContent.length - 1]);
    if (display.textContent.length === 0) {
        display.textContent = '0';
    }
}

function Calc(operator, a, b) {
    const isNotValid = (operator === undefined || typeof a !== 'number' || typeof b !== 'number');
    const operations = {
        'sum': a + b,
        'sub': a - b,
        'mult': a * b,
        'div': a / b,
    }

    if (isNotValid) {
        display.textContent = 'Error';
        return 'Error';
    }
    if (operator in operations) {
        display.textContent = operations[operator];
        return operations[operator];
    } else {
        display.textContent = 'Unknown operation';
        return 'Unknown operation';
    }
}