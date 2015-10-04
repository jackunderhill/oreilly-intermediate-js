window.onload = init;

function init() {
    // get inputs
    var operand1 = document.getElementById('operand1');
    var operand2 = document.getElementById('operand2');
    var operator = document.getElementById('operator');

    // add click handler to the submit button
    var submitBtn = document.getElementById('submit');
    submitBtn.onclick = validateForm;
}

function validateForm() {
    // get input values
    var op1 = parseInt(operand1.value,10);
    var op2 = parseInt(operand2.value,10);
    var op = operator.value;

    // if any of the inputs are empty, alert the user with a message
    if (op1.length < 1 || op2.length < 1 || op.length < 1) {
        alert('Please enter a value for all fields');
        // return out of function so there are no more alerts
        return;
    }

    try {
        // if either of the operands is not a valid integer, throw an error
        if (isNaN(op1) || isNaN(op2)) {
            throw new Error("Date format error: Please enter a number for each operand");
        }
        // if the operator is invalid, throw an error.
        else if (op != '/' && op != '*' && op != '+' && op != '-') {
            throw new Error('Operator error: Please enter /, *, + or -');
        }
        // if the user tries to divide by zero, throw an error
        else if (op == '/' && op2 === 0) {
            throw new Error('Compute error: You cannot divide by 0');
        }
        // otherwise, run the compute function
        else {
            computeData(op1, op2, op);
        }
    }
    catch (ex) {
        alert(ex.message);
    }


}

// When the user clicks the button, compute the result of the expression.
function computeData(op1, op2, op) {
    var result;

    // choose the correct operator depending on operator input string
    switch (op) {
        case '/':
            result = op1 / op2;
            break;
        case '*':
            result = op1 * op2;
            break;
        case '+':
            result = op1 + op2;
            break;
        case '-':
            result = op1 - op2;
            break;
    }

    // display our computed result in the page
    displayResult(result);
}

function displayResult (res) {
    var result = document.getElementById('result');
    result.innerHTML = res;
}
