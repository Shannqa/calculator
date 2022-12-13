const display = document.querySelector('.display-main');
const displayTop = document.querySelector('.display-top');

display.textContent = '0';
let storedValue1 = null;
let storedValue2 = null;
let operator = null;
let resetScreen = false;
let operationActive = false;


const buttonNumber = document.querySelectorAll('.button-number');
buttonNumber.forEach((button) => {
  button.addEventListener('click', () => {

    if (display.textContent === '0' || display.textContent === 0 || resetScreen === true) {
      display.textContent = '';
      resetScreen = false;
      display.textContent = display.textContent + button.textContent;
    } else {
      display.textContent = display.textContent + button.textContent;
    }
  })
});

const buttonPlus = document.querySelector('.button-plus');
buttonPlus.addEventListener('click', () => {
  if (operationActive === false) {
    operator = '+'
    displayTop.textContent = display.textContent + ' ' + operator;
    operationActive = true;
    storedValue1 = display.textContent;
    resetScreen = true;
  } else if (operationActive === true) {
    operator = '+'
    displayTop.textContent = display.textContent + ' ' + operator;
    storedValue2 = display.textContent;
    resetScreen = true;
    display.textContent = operate(operator, storedValue1, storedValue2);
  }
});

const buttonMinus = document.querySelector('.button-minus');
buttonMinus.addEventListener('click', () => {
  operator = '-';
  displayValue = displayValue + ' - ';
  display.textContent = displayValue;
});

const buttonMultiply = document.querySelector('.button-multiply');
buttonMultiply.addEventListener('click', () => {
  operator = '*';
  displayValue = displayValue + ' * ';
  display.textContent = displayValue;
});

const buttonDivide = document.querySelector('.button-divide');
buttonDivide.addEventListener('click', () => {
  operator = '/';
  displayValue = displayValue + ' / ';
  display.textContent = displayValue;
});

const buttonEquals = document.querySelector('.button-equals');
buttonEquals.addEventListener('click', () => {
  storedValue2 = display.textContent;
  display.textContent = operate (operator, storedValue1, storedValue2);
});

const buttonClear = document.querySelector('.button-clear');
buttonClear.addEventListener('click', () => {
  // displayValue = '';
  display.textContent = 0;
  storedValue1 = null;
  storedValue2 = null;
  operator = null;
  displayTop.textContent = '';
});


function add (value1, value2) {
  let result = parseInt(value1) + parseInt(value2);
  return result;
}

function substract (value1, value2) {
  let result = parseInt(value1) - parseInt(value2);
  return result;
}

function multiply (value1, value2) {
  let result = parseInt(value1) * parseInt(value2);
  return result;
}

function divide (value1, value2) {
  let result = parseInt(value1) / parseInt(value2);
  return result;
}

function operate (operator, value1, value2) {
  
  if (operator === '+') {
    let result = add (value1, value2);
    resetScreen = true;
    storedValue1 = result;
    storedValue2 = null;
    operator = null;
    return result;
  } else if (operator === '-') {
    let result = substract (value1, value2);
    resetScreen = true;
    storedValue1 = null;
    storedValue2 = null;
    operator = null;
    return result; 
  } else if (operator === '*') {
    let result = multiply (value1, value2);
    resetScreen = true;
    storedValue1 = null;
    storedValue2 = null;
    operator = null;
    return result; 
  } else if (operator === '/') {
    let result = divide (value1, value2);
    resetScreen = true;
    storedValue1 = null;
    storedValue2 = null;
    operator = null;
    return result;
  } else {
    return 'Error';
  };


}