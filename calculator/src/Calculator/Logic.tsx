import { BtnTypes, NumpadButtonType } from "./utils";

export function valHistory(prevHistory: string, btn: NumpadButtonType): string {
    function checkBeforeChar(regex: RegExp) {
        const a = prevHistory.split(regex);

        if (a.length === 1) {
            return true;
        } else {
            if (a[a.length - 1] === '') {
                return false;
            } else {
                return true;
            }
        }
    }

    switch (btn.type) {
        case BtnTypes.CLEAR:
            return '';

        case BtnTypes.BACK:
            return prevHistory.slice(0, -1);

        case BtnTypes.POINT:
            if (prevHistory === '') {
                return '0.';
            } else {
                return `${prevHistory}.`;
            }
        case BtnTypes.EQUAL:
            const calc = doMath(prevHistory);
            if (typeof calc === 'string') {
                return prevHistory;
            }
            return calc.toString();

        case BtnTypes.OPERATOR:
            if (prevHistory === '') return '';
            const regex = btn.oper === ('/' || '*') ? /[*\-+%/()]+/g : /[\-+%/()]+/g;

            if (checkBeforeChar(regex)) {
                return `${prevHistory}${btn.oper}`;
            } else {
                return prevHistory;
            }

        case BtnTypes.NUMBER:
            if (btn.oper === '0') {
                return prevHistory === '' || prevHistory === '0'
                    ? prevHistory
                    : prevHistory + btn.oper;
            } else {
                return prevHistory + btn.oper;
            }

        default:
            return prevHistory;
    }
}

export default function doMath(s: string) {
    const postfix = convertToPostfix('0' + s);
    return postfix_evaluation(postfix);
}

const priority = (operator: string) => {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;

        default:
            return -1;
    }
};

const calculateValue = (num1: number, operator: string, num2: number): number => {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 0;
    }
};

const convertToPostfix = (infix: string) => {
    var operators = [];
    var postfix = '';
    for (var i = 0; i < infix.length; i++) {
        if ((infix[i] >= '0' && infix[i] <= '9') || infix[i] == '.') {
            postfix += infix[i];
        } else {
            postfix += ' ';
            if (operators.length === 0) {
                operators.push(infix[i]);
            } else {
                if (priority(infix[i]) > priority(operators[operators.length - 1])) {
                    operators.push(infix[i]);
                } else {
                    while (
                        !(operators.length === 0) &&
                        priority(infix[i]) <= priority(operators[operators.length - 1])
                    ) {
                        var ch = operators[operators.length - 1];
                        operators.pop();
                        postfix += ch;
                    }
                    operators.push(infix[i]);
                }
            }
        }
    }
    postfix += ' ';
    while (!(operators.length === 0)) {
        var ch = operators[operators.length - 1];
        postfix += ch;
        operators.pop();
    }
    return postfix;
};

const postfix_evaluation = (postfix: string) => {
    var answer = [],
        n,
        result;
    for (var i = 0; i < postfix.length; i++) {
        if ((postfix[i] >= '0' && postfix[i] <= '9') || postfix[i] == '.') {
            var number = '';
            while (postfix[i] != ' ') {
                number += postfix[i];
                i++;
            }
            n = parseFloat(number);
            answer.push(n);
        } else {
            if (answer.length < 2) {
                result = '';
                return result;
            } else {
                var num2 = answer[answer.length - 1];
                answer.pop();
                var num1 = answer[answer.length - 1];
                answer.pop();
                result = calculateValue(num1, postfix[i], num2);
                answer.push(result);
            }
        }
    }
    var finalAns = answer[answer.length - 1];
    answer.pop();
    if (answer.length === 0) {
        return finalAns;
    } else {
        return '';
    }
};
