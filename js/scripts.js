const display = document.querySelector('.display');

let displayValueZero = 0;
display.textContent = displayValueZero;
let displayValue = ''
let storedValue1 = '';
let storedValue2 = '';
let operator;

const buttonNumber = document.querySelectorAll('.button-number');
buttonNumber.forEach((button) => {
  button.addEventListener('click', () => {
    if (operator === undefined) {
      storedValue1 = storedValue1 + button.textContent;
      displayValue = displayValue + button.textContent;
    } else if (operator !== undefined) {
      storedValue2 = storedValue2 + button.textContent;
      displayValue = displayValue + button.textContent;
    }
    display.textContent = displayValue;
  })
});

const buttonPlus = document.querySelector('.button-plus');
buttonPlus.addEventListener('click', () => {
  operator = '+';
  displayValue = displayValue + ' + ';
  display.textContent = displayValue;
});


const buttonEquals = document.querySelector('.button-equals');
buttonEquals.addEventListener('click', () => {
  display.textContent = operate (operator, storedValue1, storedValue2);
});

function add (value1, value2) {
  let result = parseInt(value1) + parseInt(value2);
  return result;
}

function substract (value1, value2) {
  let result = value1 - value2;
  return result;
}

function multiply (value1, value2) {
  let result = value1 * value2;
  return result;
}

function divide (value1, value2) {
  let result = value1 / value2;
  return result;
}

function operate (operator, value1, value2) {
  
  if (operator === '+') {
    return add (value1, value2);
  } else if (operator === '-') {
    return substract (value1, value2);
  } else if (operator === '*') {
    return multiply (value1, value2);
  } else if (operator === '/') {
    return divide (value1, value2);
  } else {
    return 'Error';
  }
}