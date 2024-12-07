const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'Completed/Day7Input.txt'
var lines = [];
let part2 = false;
function evaluateLeftToRight(expression) {
    let result = expression[0];
    for (let i = 1; i < expression.length; i += 2) {
        let operator = expression[i];
        let number = expression[i + 1];
        if (operator === '+') result += number;
        else if (operator === '*') result *= number;
        else if (operator === '||') result = parseInt(`${result}${number}`, 10);
    }
    return result;
}

function generateCombinations(numbers, target, currentExpression = [], index = 1) {
    if (index === numbers.length) {
        if (evaluateLeftToRight([numbers[0], ...currentExpression]) === target) {
            return true;
        }
        return false;
    }

    if (generateCombinations(numbers,target,[...currentExpression, '+', numbers[index]],index + 1))
        return true;

    if (generateCombinations(numbers,target,[...currentExpression, '*', numbers[index]],index + 1))
        return true;

    if(part2){
        if (generateCombinations(numbers,target,[...currentExpression, '||', numbers[index]],index + 1))
            return true;
    }
    return false;
}

function parse(text){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    lines = lines.split('\n');
    let values = lines.map(ele=>ele.split(': ')[0]).map(e=>Number(e));
    let nums = lines.map(ele=>ele.split(': ')[1].split(' ').map(e=>Number(e)));
    return [values,nums];
}

function solve(p2){
    let [vals,numbers] = parse(filename);
    let results = 0;
    part2 = p2;
    for(let i=0; i<vals.length; i++){
        if (generateCombinations(numbers[i], vals[i])) {
            results += vals[i];
        }
    }
    return results;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);