const display = document.querySelector('.display-main');
const displayTop = document.querySelector('.display-top');
displayTop.textContent = '';
display.textContent = '0';
let storedValue1 = null;
let storedValue2 = null;
let operator = null;
let currentAction = 'ready';


const buttonNumber = document.querySelectorAll('.button-number');
buttonNumber.forEach((button) => {
  button.addEventListener('click', () => {
    switch (currentAction) {
      case 'ready':
        display.textContent = '';
        display.textContent += button.textContent;
        currentAction = 'numbers';
      break;
      case 'numbers':
        display.textContent += button.textContent;
      break;
      case 'add':
      case 'minus':
        display.textContent = '';
        display.textContent += button.textContent;
        currentAction = 'numbers';
      break;
      case 'equals':
        if (operator === null) {
          display.textContent += button.textContent;
          currentAction = 'numbers';
        } else {
        display.textContent = '';
        display.textContent += button.textContent;
        currentAction = 'numbers';
        }
      break;
    } 
  });
});

    
const buttonPlus = document.querySelector('.button-plus');
buttonPlus.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
      break;
    case 'add':
      break;
    case 'equals':
      currentAction = 'add';
      operator = '+';
      break;
    case 'numbers':
      if (storedValue1 === null) {
        operator = '+';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator === null && storedValue1 !== null && storedValue2 === null){
        // in case: operation is run by pressing equals button, then a number button is pressed. which changes the displayed value, but the operator is still null from running the previous operation
        currentAction = 'add';
        operator = '+';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator !== null && storedValue1 !== null && storedValue2 === null){  
        storedValue2 = display.textContent;
        displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
        display.textContent = operate(operator, storedValue1, storedValue2);
        currentAction = 'add';
        storedValue1 = display.textContent;
        storedValue2 = null;
        operator = '+';
      }
    currentAction = 'add';
    break;
  }
});

const buttonMinus = document.querySelector('.button-minus');
buttonMinus.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
      break;
    case 'minus':
      break;
    case 'equals':
      currentAction = 'minus';
      operator = '-';
      break;
    case 'numbers':
      if (storedValue1 === null) {
        operator = '-';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator === null && storedValue1 !== null && storedValue2 === null){
        // in case: operation is run by pressing equals button, then a number button is pressed. which changes the displayed value, but the operator is still null from running the previous operation
        currentAction = 'minus';
        operator = '-';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator !== null && storedValue1 !== null && storedValue2 === null){  
        storedValue2 = display.textContent;
        displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
        display.textContent = operate(operator, storedValue1, storedValue2);
        currentAction = 'minus';
        storedValue1 = display.textContent;
        storedValue2 = null;
        operator = '-';
      }
    currentAction = 'minus';
    break;
  }
});

const buttonEquals = document.querySelector('.button-equals');
buttonEquals.addEventListener('click', () => {
  switch (currentAction) {
    case 'equals':
      break;
    case 'ready':
      break;
    case 'add':
      break;
    case 'minus':
      break;
    case 'numbers':
      if (storedValue1 === null && storedValue2 === null) {
        return;
      } else if (operator === null) {
        return;
      } else if (storedValue1 !== null && storedValue2 === null) {
        currentAction = 'equals';
        storedValue2 = display.textContent;
        displayTop.textContent = '';
        display.textContent = operate (operator, storedValue1, storedValue2);
        storedValue1 = display.textContent;
        storedValue2 = null;
        operator = null;
      }
    break;
    }
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



const buttonClear = document.querySelector('.button-clear');
buttonClear.addEventListener('click', () => {
  displayTop.textContent = '';
  display.textContent = '0';
  currentAction = 'ready';
  storedValue1 = null;
  storedValue2 = null;
  operator = null;
})
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

