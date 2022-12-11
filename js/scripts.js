function add (value1, value2) {
  let result = value1 + value2;
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