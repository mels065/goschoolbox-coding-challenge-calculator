import _ from 'lodash';

import regexp from './regexp';

// Returns either an object with the result or elementCounter (used to count
// elements in parenthesis)
// Has nestLevel to indicate what level of parenthesis current operation is in. Defaults to 0 to indicate outside of parenthesis
const calculate = (expression, nestLevel = 0) => {
    let result = [...expression];

    // Initialize element counter to 0
    let elementCounter = 0;
    // Find parenthesis
    let foundClosingParenthesis;
    while (result.includes('(') || result.includes(')')) {
        // Initialize the found closing parenthesis to false
        foundClosingParenthesis = false;
        for (let i = 0; i < result.length; i++) {
            // An open parenthesis means recursively calling calculate to evaluate expression within
            if (result[i] === '(') {
                // Recursively call calculate; start at the first element after the opening parenthesis
                const nestedReturn = calculate(result.slice(i+1), nestLevel + 1);
                // If a nestedReturn is returned as null, something went wrong. Return null up through the call stack
                if (!nestedReturn) {
                    return null;
                }

                // We found the nested closed parenthesis within the recursively called function, so set to true
                foundClosingParenthesis = true;
                // Replace elements equal to the nested element counter (which equals the number of parenthesis and inner 
                // operands/operators of the nested parenthesis) with the result of the nested calculation
                result.splice(
                    i,
                    nestedReturn.elementCounter,
                    ...nestedReturn.result
                );
                // Increase the element counter by the nested element counter, but also subtract 1, which represents the single 
                // returned value that we want to ignore
                elementCounter += nestedReturn.elementCounter - 1
                break;
            } else if (result[i] === ')') {
                // We do not want to find closed parenthesis on nestLevel 0, so return null
                if (nestLevel === 0) {
                    return null;
                }
                foundClosingParenthesis = true;
                // Count all elements from the opening parenthesis to the closing parenthesis
                elementCounter += i + 2;
                // Ignore everything after and including the closing parenthesis
                result = result.slice(0, i);
                break;
            }
        }
    }

    // If we are at a nest level above 0, and we could not find a closing parenthesis, this means that there is an open parenthesis
    // not paired with a closing parenthesis. Return null
    if (!foundClosingParenthesis && nestLevel > 0) {
        return null;
    }

    // If expression has an incomplete operation
    if (regexp.ARITHMETIC_SYMBOLS.test(_.last(result))) {
        return null;
    }

    // If only pluses/minuses are in the expression, return null
    if (regexp.LONE_PLUSES_MINUSES.test(result.join(''))) {
        return null;
    }

    // Find plus/minus next to each other, and convert them based on their positivity/negativity. Then, negate numbers that have a
    // single minus sign to the left of it. Remove single pluses that are to the left of numbers (by themselves)
    result = convertPositivesNegatives(result);

    // Exponent calculations
    result = performExponentOperations(result);
    // Multiplication/division calculations
    result = performMultDivOperations(result);
    //Addition/subtraction calculations
    result = performAddSubtrOperations(result);

    return {
        result,
        elementCounter
    };
}

const performOperation = (operand1, operator, operand2) => {
    if (regexp.IS_DECIMAL_NUM.test(operand1) || regexp.IS_DECIMAL_NUM.test(operand2)) {
        return performDecimalMath(operand1, operator, operand2);
    } else {
        return performIntegerMath(operand1, operator, operand2);
    }
}

const performIntegerMath = (operand1, operator, operand2) => {
    switch(operator) {
        case '+': {
            return String(Number(operand1) + Number(operand2));
        }
        case '-': {
            return String(Number(operand1) - Number(operand2));
        }
        case '*': {
            return String(Number(operand1) * Number(operand2));
        }
        case '/': {
            return String(Number(operand1) / Number(operand2));
        }
        case '^': {
            return String(Math.pow(Number(operand1), Number(operand2)));
        }
        default: {
            throw new Error("Unexpected operator");
        }
    }
}

// Due to the issues that computers have with floating-point numbers, decimals need to be handled in a special way.
const performDecimalMath = (operand1, operator, operand2) => {
    // These variables will be used to hold decimals converted to temporary integers
    let adjustedOperand1, adjustedOperand2;
    // This will indicate the maximum capacity of decimal places among both numbers
    let maxDecimalPlaceCapacity;
    if (operator !== '^') {
        // Grab the fractional parts of the decimal
        const numOfFractionalPartsSize1 = operand1.match(regexp.IS_DECIMAL_NUM)[1].length;
        const numOfFractionalPartsSize2 = operand2.match(regexp.IS_DECIMAL_NUM)[1].length;
        // Get this value by taking 10 to the power of the maximum between the sizes of the different fractional parts
        maxDecimalPlaceCapacity = Math.pow(
            10,
            Math.max(numOfFractionalPartsSize1, numOfFractionalPartsSize2)
        );

        // Get the adjusted operands by multiplying the raw decimal operands with the max decimal place capacity
        adjustedOperand1 = operand1 * maxDecimalPlaceCapacity;
        adjustedOperand2 = operand2 * maxDecimalPlaceCapacity;
    }
    
    switch(operator) {
        // For pluses and minuses, we add/subtract the operands, and then divide by the max decimal place capacity
        case '+': {
            return String((Number(adjustedOperand1) + Number(adjustedOperand2)) / maxDecimalPlaceCapacity);
        }
        case '-': {
            return String((Number(adjustedOperand1) - Number(adjustedOperand2)) / maxDecimalPlaceCapacity);
        }
        // For multiplication, we multipy the operands, and then divide by the max decimal place capacity squared
        case '*': {
            return String((Number(adjustedOperand1) * Number(adjustedOperand2)) / Math.pow(maxDecimalPlaceCapacity, 2));
        }
        case '/': {
            return String((Number(adjustedOperand1) / Number(adjustedOperand2)));
        }
        case '^': {
            return String(Math.pow(Number(operand1), Number(operand2)));
        }
        default: {
            throw new Error("Unexpected operator");
        }
    }
}

const convertPositivesNegatives = expression => {
    const result = [...expression];

    // Find any recurring pluses/minus, and convert them appropriately
    if (regexp.CHAINED_PLUSES_MINUS.test(result.join(','))) {
        for (let i = 0; i < result.length; i++) {
            if (regexp.PLUS_MINUS_SYMBOLS.test(result[i]) && regexp.PLUS_MINUS_SYMBOLS.test(result[i+1])) {
                if ((result[i] === '+' && result[i+1] === '+') || (result[i] === '-' && result[i+1] === '-')) {
                    result.splice(i, 2, '+');
                } else {
                    result.splice(i, 2, '-');
                }
            }
        }
    }

    // See if there are any + or - at the beginning of the operation, or immediately after a *, /, or ^. Then, either negate
    // the number following it if it is -, or remove it if it is +.
    if (regexp.PLUSES_MINUSES_BEGINNING.test(result.join('')) || regexp.MULT_DIV_EXP_THEN_PLUS_MINUS.test(result.join(''))) {
        if (result[0] === '-') {
            result.splice(0, 2, `-${result[1]}`);
        } else if (result[0] === '+') {
            result.splice(0, 1);
        }

        for (let i = 1; i < result.length; i++) {
            if (regexp.MULT_DIV_EXP_SYMBOLS.test(result[i]) && result[i+1] === '-') {
                result.splice(i+1, 2, `-${result[i+2]}`);
            } else if (regexp.MULT_DIV_EXP_SYMBOLS.test(result[i]) && result[i+1] === '+') {
                result.splice(i+1, 1);
            }
        }
    }

    return result;
}

const performExponentOperations = expression => {
    const result = [...expression];

    if (regexp.EXPONENT_OPERATION.test(result.join(''))) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] === '^') {
                result.splice(
                    i - 1,
                    3,
                    performOperation(result[i-1], result[i], result[i+1])
                );
                i--;
            }
        }
    }

    return result;
}

const performMultDivOperations = expression => {
    const result = [...expression];

    if (regexp.MULT_DIV_OPERATION.test(result.join(''))) {
        for (let i = 0; i < result.length; i++) {
            if (regexp.MULT_DIV_SYMBOLS.test(result[i])) {
                result.splice(
                    i - 1,
                    3,
                    performOperation(result[i-1], result[i], result[i+1])
                );
                i--;
            }
        }
    }

    return result;
}

const performAddSubtrOperations = expression => {
    const result = [...expression];

    if (regexp.ADD_SUBTR_OPERATION.test(result.join(''))) {
        for (let i = 0; i < result.length; i++) {
            if (regexp.PLUS_MINUS_SYMBOLS.test(result[i])) {
                result.splice(
                    i - 1,
                    3,
                    performOperation(result[i-1], result[i], result[i+1])
                );
                i--;
            }
        }
    }

    return result;
}

const calc = {
    calculate
};

export default calc;
