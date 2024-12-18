const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}

var filename = 'input.txt'
var part2 = false;

function parse(text){
    let lines = file.getSample(text).trim();
    lines = lines.split('\n').map(ele=>ele.split(',').map(Number));
    return lines;
}

function solve(p2){
    part2 = p2
    let input = parse(filename);
    return input;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);