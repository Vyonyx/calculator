add = (a, b) => a + b
subtract = (a, b) => a - b
multiply = (a, b) => a * b
divide = (a, b) => a / b

const operators = ['x', '÷', '+', '-'];

function parseEq(eq) {
    const numbers = [];
    const operations = [];
    
    let wasOperator = '';
    
    for (x in eq) {

        if (numbers.length == 0 && eq[x] == '-') {
            numbers.push(eq[x]);
            continue
        }

      if (operators.includes(eq[x])) {
        operations.push(eq[x]);
        wasOperator = true;
      } else if (numbers.length == 0) {
          numbers.push(eq[x]);
      } else if (wasOperator) {
        numbers.push(eq[x]);
        wasOperator = false;
      } else {
        numbers[numbers.length - 1] += eq[x];
        wasOperator = false;
      }
    }

    while (operations.length > 0) {
        for (n in operations) {

            if ((operations.includes('x') || operations.includes('÷')) && (operations[n] == 'x' || operations[n] == '÷')) {

                let [n1, n2] = parseInt(n) == numbers.length - 2 ? numbers.slice(n) : numbers.slice(n, 3);
                let num1 = n1.includes('.') ? parseFloat(n1) : parseInt(n1);
                let num2 = n2.includes('.') ? parseFloat(n2) : parseInt(n2);
                numbers.splice(n, 2);

                if (operations[n] == 'x') {
                    numbers.splice(n, 0, `${multiply(num1, num2)}`);
                } else if (operations[n] == '÷') {
                    numbers.splice(n, 0, `${divide(num1, num2)}`);
                }
            } else if (operations.includes('x') || operations.includes('÷')) {
                continue
            } else {

                let [n1, n2] = parseInt(n) == numbers.length - 2 ? numbers.slice(n) : numbers.slice(n, 3);
                let num1 = n1.includes('.') ? parseFloat(n1) : parseInt(n1);
                let num2 = n2.includes('.') ? parseFloat(n2) : parseInt(n2);
                numbers.splice(n, 2);

                if (operations[n] == '+') {
                    numbers.splice(n, 0, `${add(num1, num2)}`);
                } else if (operations[n] == '-') {
                    numbers.splice(n, 0, `${subtract(num1, num2)}`);
                }
            }
            operations.splice(n, 1);
            break
        }
    }
    if (numbers[0] == Infinity) return 'nope.'
    if (numbers[0].includes('.')) return `${parseFloat(numbers[0]).toFixed(2)}`;
    return numbers[0]
  }

buttons = document.querySelectorAll('.num-button');
display = document.querySelector('.display');

// Hover styles for all buttons.
buttons.forEach(element => element.addEventListener('mouseenter', () => {
    element.classList.add('hover');
}));
buttons.forEach(element => element.addEventListener('mouseleave', () => {
    element.classList.remove('hover');
}));
buttons.forEach(element => element.addEventListener('mousedown', () => {
    element.classList.add('click');
}));
buttons.forEach(element => element.addEventListener('mouseup', () => {
    element.classList.remove('click');
}));

let justCalculated = false;

function displayInput(buttonInput) {
    const noFirstOperation = ['+', 'x', '÷'];
    if (display.textContent.length >= 10) return
    if (display.textContent.length == 0 && noFirstOperation.includes(buttonInput)) return
    if (display.textContent == '-' && operators.includes(buttonInput)) return
    if (display.textContent == 'nope.') {
        display.textContent = buttonInput;
        return
    }
    if (buttonInput == '.' && display.textContent.includes('.')) {
        if (justCalculated) {
            justCalculated = false;
            display.textContent = `${buttonInput}`
        } else {
            return
        }
    } else if (justCalculated & display.textContent) {
        justCalculated = false;
        display.textContent += `${buttonInput}`
    } else {
        justCalculated = false;
        display.textContent += `${buttonInput}`;
    }
}

buttons.forEach(element => element.addEventListener('click', () => {
    if (element.classList.contains('num') || element.classList.contains('symbol')) {
        displayInput(element.innerHTML);
    }
}));

// Equals button functionality.

const eqButton = document.querySelector('.equals');
eqButton.addEventListener('click', () => {
    if (display.textContent.length == 0) return
    const eqInput = display.textContent;
    const result = parseEq(eqInput);
    display.textContent = `${result}`;
    justCalculated = true;
});


// Clear display functionality.

clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    display.textContent = '';
    justCalculated = false;
});

// Positive/Negative button functionality.

posNegBtn = document.querySelector('.pos-neg');
posNegBtn.addEventListener('click', () => {
    if (display.textContent.length == 0) return
    const oldNum = display.textContent;
    let num = oldNum.includes('.') ? parseFloat(oldNum) : parseInt(oldNum);
    num *= -1;
    display.textContent = `${num}`;
});

const percentageBtn = document.querySelector('.percentage');
percentageBtn.addEventListener('click', () => {
    if (display.textContent.length == 0) return
    for (x in display.textContent) {
        if (operators.includes(display.textContent[x])) return
    }
    const percentResult = display.textContent.includes('.') ? parseFloat(display.textContent) : parseInt(display.textContent);
    display.textContent = `${(percentResult * 0.1).toFixed(2)}`;
});