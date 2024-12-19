const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}
let sum = 0;
var file = file.getSample('sample.txt');
var part2 = false;
var results = {};


function parse(){
    let lines = file.trim();
    lines = lines.split('\n');
    return lines;
}

function solve(p2){
    part2 = p2
    let input = parse();
    let count = 0;
    for(let i=0; i<input.length; i++){
        count++;
    }
    return count;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);