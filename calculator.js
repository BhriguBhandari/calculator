document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".button");
  const clearButton = document.querySelector(".clear");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalButton = document.querySelector(".operator");
  const percentageButton = document.querySelector(".first-row-percentage");
  const plusMinusButton = document.querySelector(".first-row-change");

  let currentInput = "0";
  let firstOperand = null;
  let operator = null;
  let shouldResetDisplay = false;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function clear() {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
  }

  clearButton.addEventListener("click", clear);

  function inputDigit(digit) {
    if (currentInput === "0" || shouldResetDisplay) {
      currentInput = digit;
      shouldResetDisplay = false;
    } else {
      currentInput += digit;
    }
    updateDisplay();
  }

  function inputDecimal() {
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
    updateDisplay();
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && shouldResetDisplay) {
      operator = nextOperator;
      return;
    }

    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
      currentInput = String(result);
      firstOperand = result;
    }

    shouldResetDisplay = true;
    operator = nextOperator;
  }

  function calculatePercentage() {
    const percentageValue = parseFloat(currentInput) / 100;
    currentInput = String(percentageValue);
    updateDisplay();
  }

  function toggleSign() {
    currentInput = String(-parseFloat(currentInput));
    updateDisplay();
  }

  const performCalculation = {
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    X: (firstOperand, secondOperand) => firstOperand * secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,
  };

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleOperator(button.textContent);
      updateDisplay();
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("operator")) {
        handleOperator(button.textContent);
        updateDisplay();
        return;
      }

      if (button.classList.contains("button")) {
        inputDigit(button.textContent);
        return;
      }

      if (button.textContent === ".") {
        inputDecimal();
        return;
      }
    });
  });

  percentageButton.addEventListener("click", calculatePercentage);
  plusMinusButton.addEventListener("click", toggleSign);
});
