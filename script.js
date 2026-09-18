const buttons = document.querySelectorAll(".btn");
const displayOperation = document.querySelector(".calculation");
const calculation = document.querySelector(".calculated");

let previousNum = "";
let newNum = "";
let operator = "";
let result;

function operations() {
    if (operator === "+") {
        result = Number(previousNum) + Number(newNum);
    }

    else if (operator === "-") {
        result = Number(previousNum) - Number(newNum);
    }

    else if (operator === "x") {
        result = Number(previousNum) * Number(newNum);
    }

    else if (operator === "÷") {
        result = Number(previousNum) / Number(newNum);
    }
};

function logic(value, type) {

    // Number
    if (type === "number") {

        if (!calculation.textContent.length) {
            previousNum += value;
        } else {
            newNum += value;
        }

        displayOperation.textContent += value;
    }

    // Operator
    else if (type === 'operator') {

        // Number must be entered first
        if (!displayOperation.textContent.length) {
            return;
        }

        // Calculate previous operation
        if (calculation.textContent.length) {

            operations(); //call the function for calculation

            previousNum = result;
            newNum = "";

            calculation.textContent =
                result + value;

            displayOperation.textContent = "";
        }

        // First operator
        else {

            calculation.textContent =
                displayOperation.textContent + value

            displayOperation.textContent = "";
        }

        // Save current operator
        operator = value;
    }

    //actoins
    else if (type === "action") {

        //calculate
        if (value === 'calculate') {

            //revoke the operatoins function
            operations();

            previousNum = String(result);
            newNum = '';
            operator = '';

            displayOperation.textContent = result;
            calculation.textContent = '';
        };

        //clear
        if (value === 'clear') {
            displayOperation.textContent = '';
            calculation.textContent = '';
            previousNum = '';
            newNum = '';
            operator = '';
        };

        //Delete Single
        if (value === 'delete') {

            if (displayOperation.textContent.length) {
                displayOperation.textContent = displayOperation.textContent.slice(0, -1);

                if (!newNum) {
                    previousNum = previousNum.slice(0, -1);
                } else {
                    newNum = newNum.slice(0, -1);
                };

            } else {
                return;
            }
        };

        //percentage
        if (value === 'percent') {
            displayOperation.textContent = Number(displayOperation.textContent) / 100;
            if (!newNum) {
                previousNum = String(Number(previousNum) / 100);
            } else {
                newNum = String(Number(newNum) / 100);
            }
        }
    };

    //Absoulte
    if (type === 'toggle') {
        displayOperation.textContent = Number(displayOperation.textContent) * -1;

        if (!newNum) {
            previousNum = String(Number(previousNum) * -1);
        } else {
            newNum = String(Number(newNum) * -1);
        }
    }

};

buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

        //number
        if (btn.dataset.number) {
            logic(btn.dataset.number, 'number');
        }

        //operator
        else if (btn.dataset.operator) {
            logic(btn.dataset.operator, 'operator');
        }
        //number
        else if (btn.dataset.action) {
            logic(btn.dataset.action, 'action');
        }
        //number
        else if (btn.dataset.toggle) {
            logic(btn.dataset.toggle, 'toggle');
        };
    });

});

//Keyboard
document.addEventListener('keydown', (keydown) => {

    //Number
    if (keydown.key >= 0 || keydown.key <= 9) {
        logic(keydown.key, 'number');
    }

    //decimal
    else if (keydown.key === '.') {
        logic(keydown.key, 'number');
    }

    //operators
    else if (keydown.key === '+' || keydown.key === '-' || keydown.key === '*' || keydown.key === '/' || keydown.key === '÷') {
        logic(keydown.key, 'operator');
    }

    //Calculation
    else if (keydown.key === 'Enter') {
        logic('calculate', 'action');
    }

    //BackSpace
    else if (keydown.key === 'Backspace') {
        logic('delete', 'action');
    }

    //ESC
    else if (keydown.key === 'Escape') {
        logic('clear', 'action');
    }

    //percentage
    else if (keydown.key === '%') {
        logic('percent', 'action');
    }

    else {
        return;
    }
})


