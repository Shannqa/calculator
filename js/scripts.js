const display = document.querySelector('.display-main');
const displayTop = document.querySelector('.display-top');
displayTop.textContent = '';
display.textContent = '0';
let storedValue1 = null;
let storedValue2 = null;
let operator = null;
let root = false;
let currentAction = 'ready';

function divByZero () {
  display.textContent = "No you don't!";
  displayTop.textContent = '';
  currentAction = 'ready';
  storedValue1 = null;
  storedValue2 = null;
  operator = null;
}

function doRoot() {
  displayTop.textContent += ' ' + display.textContent;
  storedValue2 = display.textContent.slice(1);
  storedValue2 = operate('√', storedValue2);
  display.textContent = operate(operator, storedValue1, storedValue2);
  root = false;
}

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.key === '+') {
    buttonPlus.click();
  } else if (event.key === '-') {
    buttonMinus.click();
  } else if (event.key === '=' || event.key === 'Enter') {
    buttonEquals.click();
  } else if (event.key === '/') {
    buttonDivide.click();
  } else if (event.key === '*') {
    buttonMultiply.click();
  } else if (event.key === '.') {
    buttonDot.click();
  } else if (event.key === 'Backspace') {
   buttonDelete.click();
  } else if (event.key === 'c' || event.key === 'C') {
    buttonClear.click();
  } else if (!isNaN(event.key)) {
    document.querySelector(`#num${event.key}`).click();
  }
});

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
      case 'multiply':
      case 'divide':
      case 'power':
        display.textContent = '';
        display.textContent += button.textContent;
        currentAction = 'numbers';
      break;
      case 'sqrt':
        display.textContent += button.textContent;
        currentAction = 'numbers';
        root = true;
        break;
      case 'equals':
        display.textContent = '';
        display.textContent += button.textContent;
        currentAction = 'numbers';
      break;
    } 
  });
});

    
const buttonPlus = document.querySelector('.button-plus');
buttonPlus.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
    case 'add':
      break;
    case 'equals':
      currentAction = 'add';
      operator = '+';
      break;
    /* change the operator */
    case 'minus':
    case 'multiply':
    case 'divide':
    case 'power':
      currentAction = 'add';
      operator = '+';
      displayTop.textContent = displayTop.textContent.slice(0, -1);
      displayTop.textContent += operator;
      break;
    case 'sqrt':

      currentAction = 'add';
      operator = '+';
      displayTop.textContent += ' = ' + display.textContent + ' ' + operator;
      break;       
    case 'numbers':
      if (root === true) { // numbers -> operator -> sqrt -> numbers -> operator
        doRoot();
        operator = '+';
        displayTop.textContent += ' ' + operator;
        storedValue1 = display.textContent;
        currentAction = 'add';
        storedValue2 = null;
      } else {
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
        if (operator === '√') {
          // numbers1 -> + -> √ -> numbers2 -> +
          storedValue2 = display.textContent.slice(1);
          displayTop.textContent += ' √' + storedValue2;
          storedValue2 = operate(operator, storedValue2); // first do √(numbers2)
          currentAction = 'add';
          operator = '+';
          display.textContent = operate(operator, storedValue1, storedValue2); // then do numbers1 + √(numbers2)
          displayTop.textContent += ' ' + operator;
          storedValue1 = display.textContent;
          storedValue2 = null;

        } else if (operator === '/' && parseInt(storedValue2) === 0) {
          storedValue2 = display.textContent;
          divByZero();
        } else {
          storedValue2 = display.textContent;
          displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
          display.textContent = operate(operator, storedValue1, storedValue2);
          currentAction = 'add';
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = '+';
        }
      }
    currentAction = 'add';
    break;
  }}
});

const buttonMinus = document.querySelector('.button-minus');
buttonMinus.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
    case 'minus':
      break;
    case 'equals':
      currentAction = 'minus';
      operator = '-';
      break;
    /* change the operator */
    case 'add':
    case 'multiply':
    case 'divide':
    case 'power':
    case 'sqrt': 
      currentAction = 'minus';
      operator = '-';
      displayTop.textContent = displayTop.textContent.slice(0, -1);
      displayTop.textContent += operator;
      break;
    case 'numbers':
      if (root === true) { // numbers -> operator -> sqrt -> numbers -> operator
        doRoot();
        operator = '-';
        displayTop.textContent += ' ' + operator;
        storedValue1 = display.textContent;
        currentAction = 'minus';
        storedValue2 = null;
      } else {
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
        if (operator === '√') {
          // numbers1 -> - -> √ -> numbers2 -> -
          storedValue2 = display.textContent.slice(1);
          displayTop.textContent += ' √' + storedValue2;
          storedValue2 = operate(operator, storedValue2); // first do √(numbers2)
          currentAction = 'minus';
          operator = '-';
          display.textContent = operate(operator, storedValue1, storedValue2); // then do numbers1 + √(numbers2)
          displayTop.textContent += ' ' + operator;
          storedValue1 = display.textContent;
          storedValue2 = null;
        } else if (operator === "/" && parseInt(display.textContent) === 0) {
          divByZero();
        } else {
          storedValue2 = display.textContent;
          displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
          display.textContent = operate(operator, storedValue1, storedValue2);
          currentAction = 'minus';
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = '-';
        }
      }
    currentAction = 'minus';
    break;
  }}
});


const buttonMultiply = document.querySelector('.button-multiply');
buttonMultiply.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
    case 'multiply':
      break;
    case 'equals':
      currentAction = 'multiply';
      operator = '*';
      break;
    /* change the operator */
    case 'add':
    case 'minus':
    case 'divide':
    case 'power':
    case 'sqrt': 
      currentAction = 'multiply';
      operator = '*';
      displayTop.textContent = displayTop.textContent.slice(0, -1);
      displayTop.textContent += operator;
      break;
    case 'numbers':
      if (root === true) { // numbers -> operator -> sqrt -> numbers -> operator
        doRoot();
        operator = '*';
        displayTop.textContent += ' ' + operator;
        storedValue1 = display.textContent;
        currentAction = 'multiply';
        storedValue2 = null;
      } else {
      if (storedValue1 === null) {
        operator = '*';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator === null && storedValue1 !== null && storedValue2 === null){
        // in case: operation is run by pressing equals button, then a number button is pressed. which changes the displayed value, but the operator is still null from running the previous operation
        currentAction = 'multiply';
        operator = '*';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator !== null && storedValue1 !== null && storedValue2 === null){  
        if (operator === '√') {
          // numbers1 -> * -> √ -> numbers2 -> *
          storedValue2 = display.textContent.slice(1);
          displayTop.textContent += ' √' + storedValue2;
          storedValue2 = operate(operator, storedValue2); // first do √(numbers2)
          currentAction = 'multiply';
          operator = '*';
          display.textContent = operate(operator, storedValue1, storedValue2); // then do numbers1 * √(numbers2)
          displayTop.textContent += ' ' + operator;
          storedValue1 = display.textContent;
          storedValue2 = null;
        } else if (operator === "/" && parseInt(display.textContent) === 0) {
          divByZero();
        } else {
          storedValue2 = display.textContent;
          displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
          display.textContent = operate(operator, storedValue1, storedValue2);
          currentAction = 'multiply';
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = '*';
        }
      }
    currentAction = 'multiply';
    break;
  }}
});

const buttonDivide = document.querySelector('.button-divide');
buttonDivide.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
    case 'divide':
      break;
    case 'equals':
      currentAction = 'divide';
      operator = '/';
      break;
    /* change the operator */
    case 'add':
    case 'minus':
    case 'multiply':
    case 'power':
    case 'sqrt': 
      currentAction = 'divide';
      operator = '/';
      displayTop.textContent = displayTop.textContent.slice(0, -1);
      displayTop.textContent += operator;
      break;
    case 'numbers':
      if (root === true) { // numbers -> operator -> sqrt -> numbers -> operator
        doRoot();
        operator = '/';
        displayTop.textContent += ' ' + operator;
        storedValue1 = display.textContent;
        currentAction = 'divide';
        storedValue2 = null;
      } else {
      if (storedValue1 === null) {
        operator = '/';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator === null && storedValue1 !== null && storedValue2 === null){
        // in case: operation is run by pressing equals button, then a number button is pressed. which changes the displayed value, but the operator is still null from running the previous operation
        currentAction = 'divide';
        operator = '/';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator !== null && storedValue1 !== null && storedValue2 === null){  
        if (operator === '√') {
          // numbers1 -> / -> √ -> numbers2 -> /
          storedValue2 = display.textContent.slice(1);
          displayTop.textContent += ' √' + storedValue2;
          storedValue2 = operate(operator, storedValue2); // first do √(numbers2)
          currentAction = 'divide';
          operator = '/';
          display.textContent = operate(operator, storedValue1, storedValue2); // then do numbers1 / √(numbers2)
          displayTop.textContent += ' ' + operator;
          storedValue1 = display.textContent;
          storedValue2 = null;
        } else if (operator === "/" && parseInt(display.textContent) === 0) {
          divByZero();
        } else {
          storedValue2 = display.textContent;
          displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
          display.textContent = operate(operator, storedValue1, storedValue2);
          currentAction = 'divide';
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = '/';
        }
      }
    currentAction = 'divide';
    break;
  }}
});

const buttonPower = document.querySelector('.button-power');
buttonPower.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
    case 'power':
      break;
    case 'equals':
      currentAction = 'power';
      operator = '^';
      break;
    /* change the operator */
    case 'add':
    case 'minus':
    case 'multiply':
    case 'divide':
    case 'sqrt': 
      currentAction = 'power';
      operator = '^';
      displayTop.textContent = displayTop.textContent.slice(0, -1);
      displayTop.textContent += operator;
      break;      
    case 'numbers':
      if (root === true) { // numbers -> operator -> sqrt -> numbers -> operator
        operator = '^';
        displayTop.textContent += ' ' + operator;
        storedValue1 = display.textContent;
        currentAction = 'power';
        storedValue2 = null;
      } else {
      if (storedValue1 === null) {
        operator = '^';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator === null && storedValue1 !== null && storedValue2 === null){
        // in case: operation is run by pressing equals button, then a number button is pressed. which changes the displayed value, but the operator is still null from running the previous operation
        currentAction = 'power';
        operator = '^';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator !== null && storedValue1 !== null && storedValue2 === null){  
        if (operator === '√') {
          // numbers1 -> ^ -> √ -> numbers2 -> ^
          storedValue2 = display.textContent.slice(1);
          displayTop.textContent += ' √' + storedValue2;
          storedValue2 = operate(operator, storedValue2); // first do √(numbers2)
          currentAction = 'power';
          operator = '^';
          display.textContent = operate(operator, storedValue1, storedValue2); // then do numbers1 ^ √(numbers2)
          displayTop.textContent += ' ' + operator;
          storedValue1 = display.textContent;
          storedValue2 = null;
        } else if (operator === "/" && parseInt(display.textContent) === 0) {
          divByZero();
        } else {
          storedValue2 = display.textContent;
          displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
          display.textContent = operate(operator, storedValue1, storedValue2);
          currentAction = 'power';
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = '^';
        }  
      }
    currentAction = 'power';
    break;
  }}
});

const buttonSqrt = document.querySelector('.button-sqrt');
buttonSqrt.addEventListener('click', () => {
  switch (currentAction) {
    case 'ready':
    case 'sqrt':
      break;
    case 'equals': //sqrt of the result of the previous equation
      currentAction = 'sqrt';
      operator = '√';
      displayTop.textContent += operator + storedValue1;
      display.textContent = operate(operator, storedValue1);
      storedValue1 = display.textContent;
      break;
    case 'add':
    case 'minus':
    case 'multiply':
    case 'divide':
    case 'power': 
      // number -> operator other than sqrt -> sqrt
      currentAction = 'sqrt';
      display.textContent = '√';
      break;
    case 'numbers': 
      if (storedValue1 === null) { 
        operator = '√';
        storedValue1 = display.textContent;
        displayTop.textContent += operator + storedValue1;
        display.textContent = operate(operator, storedValue1);
        currentAction = 'sqrt';
        storedValue1 = display.textContent;
      } else if (operator === null && storedValue1 !== null && storedValue2 === null){
        // in case: operation is run by pressing equals button, then a number button is pressed. which changes the displayed value, but the operator is still null from running the previous operation
        currentAction = 'sqrt';
        operator = '√';
        storedValue1 = display.textContent;
        displayTop.textContent += storedValue1 + ' ' + operator;
      } else if (operator !== null && storedValue1 !== null && storedValue2 === null){



        storedValue2 = display.textContent;
        if (operator === "/" && parseInt(storedValue2) === 0) {
          divByZero();
        } else {
          displayTop.textContent += ' ' + storedValue2 + ' ' + operator;
          display.textContent = operate(operator, storedValue1, storedValue2);
          currentAction = 'sqrt';
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = '√';
        }  
      }
    currentAction = 'sqrt';
    break;
  }
});

const buttonEquals = document.querySelector('.button-equals');
buttonEquals.addEventListener('click', () => {
  switch (currentAction) {
    case 'equals':
    case 'ready':
    case 'add':
    case 'minus':
    case 'multiply':
    case 'divide':
    case 'power':
    case 'sqrt':
      break;
    case 'numbers':
      if (storedValue1 === null && storedValue2 === null) {
        return;
      } else if (operator === null) {
        return;
      } else if (storedValue1 !== null && storedValue2 === null) {
        currentAction = 'equals';
        storedValue2 = display.textContent;
        if (operator === "/" && parseInt(storedValue2) === 0) {
          divByZero();
        } else {
          displayTop.textContent = '';
          display.textContent = operate (operator, storedValue1, storedValue2);
          storedValue1 = display.textContent;
          storedValue2 = null;
          operator = null;
        }
      }
    break;
    }
});

const buttonDelete = document.querySelector('.button-delete');
buttonDelete.addEventListener('click', () => {
  if (display.textContent.length === 1) {
    display.textContent = 0;
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
})

const buttonDot = document.querySelector('.button-dot');
buttonDot.addEventListener('click', () => {
  if (display.textContent.includes('.')) {
    return;
  } else {
    display.textContent += '.';
    currentAction = 'numbers';
  }
});

const buttonClear = document.querySelector('.button-clear');
buttonClear.addEventListener('click', () => {
  displayTop.textContent = '';
  display.textContent = '0';
  currentAction = 'ready';
  storedValue1 = null;
  storedValue2 = null;
  operator = null;
});

function add (value1, value2) {
  let result = value1 + value2;
  return result.round();
}

function substract (value1, value2) {
  let result = value1 - value2;
  return result.round();
}

function multiply (value1, value2) {
  let result = value1 * value2;
  return result.round();
}

function divide (value1, value2) {
  let result = value1 / value2;
  return result.round();
}

function power (value1, value2) {
  let result = Math.pow(value1, value2);
  return result.round();
}
function sqrt (value1) {
  let result = Math.sqrt(value1);
  return result.round();
}
/* Round the result to maximum of 6 decimal places */
Number.prototype.round = function() {
  const d = Math.pow(10, 6);
  return Math.round((this + Number.EPSILON) * d) / d;
}

function operate (operator, value1, value2) {
  value1 = parseFloat(value1);
  value2 = parseFloat(value2);

  if (operator === '+') {
    return add (value1, value2);
  } else if (operator === '-') {
    return substract (value1, value2);
  } else if (operator === '*') {
    return multiply (value1, value2);
  } else if (operator === '/') {
    return divide (value1, value2);
  } else if (operator === '^') {
    return power (value1, value2);
  } else if (operator === '√') {
    return sqrt (value1);
  } else {
    return 'Error';
  }
}

