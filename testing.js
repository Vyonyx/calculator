add = (a, b) => a + b
subtract = (a, b) => a - b
multiply = (a, b) => a * b
divide = (a, b) => a / b

function parseEq(eq) {
    const operators = ['x', '/', '+', '-'];
    const numbers = [];
    const operations = [];
    
    let wasOperator = '';
    
    for (x in eq) {
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

            if ((operations.includes('x') || operations.includes('/')) && (operations[n] == 'x' || operations[n] == '/')) {
                // if (operations[n] != 'x' || operations[n] != '/') {continue}

                let [n1, n2] = parseInt(n) == numbers.length - 2 ? numbers.slice(n) : numbers.slice(n, 3);
                let num1 = n1.includes('.') ? parseFloat(n1) : parseInt(n1);
                let num2 = n2.includes('.') ? parseFloat(n2) : parseInt(n2);
                numbers.splice(n, 2);

                if (operations[n] == 'x') {
                    numbers.splice(n, 0, `${multiply(num1, num2)}`);
                } else if (operations[n] == '/') {
                    numbers.splice(n, 0, `${divide(num1, num2)}`);
                }
            } else if (operations.includes('x') || operations.includes('/')) {
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
    return numbers[0]
  }
  
  let test = '18/3-7+2x5';
  let result = parseEq(test);
  console.log(result);
