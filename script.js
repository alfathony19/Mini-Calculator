// Select DOM elements
const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const buttons = document.querySelectorAll(".button");

// Variables to store calculation data
let currentInput = "";
let previousInput = "";
let operator = null;

// Update display function
function updateDisplay() {
  displayInput.textContent = currentInput || "0";
  displayHistory.textContent = `${previousInput} ${operator || ""}`;
  tempResult.textContent = calculateTemporaryResult() || "";
}

// Function to handle number input
function handleNumber(num) {
  if (num === "." && currentInput.includes(".")) return; // Prevent multiple dots
  currentInput += num;
  updateDisplay();
}

// Function to handle operator input
function handleOperator(op) {
  if (currentInput === "" && previousInput === "") return; // Prevent invalid operators

  if (currentInput !== "") {
    if (previousInput !== "") {
      // Perform calculation if operator already exists
      previousInput = calculateResult();
    } else {
      previousInput = currentInput;
    }
  }

  currentInput = "";
  operator = op;
  updateDisplay();
}

// Perform the calculation based on operator
function calculateResult() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev)) return "";
  if (isNaN(curr)) return prev.toString();

  switch (operator) {
    case "+":
      return (prev + curr).toString();
    case "-":
      return (prev - curr).toString();
    case "x":
      return (prev * curr).toString();
    case "/":
      return curr === 0 ? "Error" : (prev / curr).toString();
    case "%":
      return (prev * curr / 100).toString(); // Percentage is calculated based on previous input
    default:
      return "";
  }
}

// Calculate a temporary result without finalizing
function calculateTemporaryResult() {
  if (currentInput === "" || previousInput === "" || !operator) return "";

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return "";

  switch (operator) {
    case "+":
      return prev + curr;
    case "-":
      return prev - curr;
    case "x":
      return prev * curr;
    case "/":
      return curr === 0 ? "Error" : prev / curr;
    case "%":
      return (prev * curr) / 100;
    default:
      return "";
  }
}

// Handle equal (=) button
function handleEqual() {
  if (!operator || previousInput === "" || currentInput === "") return;

  currentInput = calculateResult();
  previousInput = "";
  operator = null;
  updateDisplay();
}

// Handle all-clear (C) button
function allClear() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay();
}

// Handle clear entry (CE) button
function clearEntry() {
  currentInput = "";
  updateDisplay();
}

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;

    if (!isNaN(value) || value === ".") {
      handleNumber(value);
    } else if (value === "C") {
      allClear();
    } else if (value === "CE") {
      clearEntry();
    } else if (value === "=") {
      handleEqual();
    } else {
      handleOperator(value);
    }
  });
});

// Initialize display
updateDisplay();
