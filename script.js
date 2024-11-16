document.addEventListener('DOMContentLoaded', function () {
    const history = document.getElementById('history_value');
    const result = document.getElementById('result_value');
    const buttons = document.querySelectorAll('button');
    var currentOperand = "";
    var currentOperator = "";
    var previousOperand = "";
    var operationInProgress = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = button.textContent;

            if (buttonText >= "0" && buttonText <= "9") {
                if (operationInProgress) {
                    currentOperand = buttonText;
                    operationInProgress = false;
                } else {
                    currentOperand += buttonText; // Concatenate digits
                }
            }
            else if (buttonText === "+" || buttonText === "-" || buttonText === "/" || buttonText === "*" || buttonText === "%") {
                if (currentOperand === "")
                    return;
                previousOperand = currentOperand;
                currentOperator = buttonText;
                history.textContent = `${previousOperand} ${currentOperator}`;
                operationInProgress = true; // Set operation in progress
            }
            else if (buttonText === "=") {
                if (currentOperand === "" || previousOperand === "")
                    return;
                result.textContent = operate(previousOperand, currentOperator, currentOperand);
                history.textContent = `${previousOperand} ${currentOperator} ${currentOperand}=`;
                currentOperand = result.textContent;
                currentOperator = "";
                operationInProgress = true;
            }
            else if (buttonText === "C") {
                currentOperand = "";
                currentOperator = "";
                previousOperand = "";
                operationInProgress = false;
                history.textContent = "";
                result.textContent = "";
            }
            else if (buttonText === "CE") {
                removeLastDigit();
            }
        });
    });

    //To remove the last digit from current operand
    function removeLastDigit() {
        if (currentOperand !== "") {
            //removing last character from the current operand
            currentOperand = currentOperand.slice(0, -1);
            //updating result display
            result.textContent = currentOperand;
        }
    }

    function operate(num1, operator, num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "%":
                return num1 % num2;
            case "/":
                if (num2 === 0) {
                    throw new Error("Division by zero");
                }
                return num1 / num2;
            default:
                throw new Error("Invalid operator");
        }
    }
});
