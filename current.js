const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'input.txt'
var lines = [];

function parse(text, part2){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    lines = lines.split('\n').map(ele=>ele.split(''));
    return lines;
}

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

function solve(part2){
    let results = parse(filename,part2);
    for(let i=0; i<results.length; i++){
        
    }
    let ans2 = 0;
    if(!part2)
        return results.length;
    return ans2;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);