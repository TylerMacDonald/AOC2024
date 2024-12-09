const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'input.txt'
let part2 = false;

function parse(text){
    var lines = [];
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    return lines.split('\n');
}

function solve(p2){
    part2 = p2
    let res = parse(filename);
    let ans = 0;
    for(let i=0; i<res.length; i++){
    }
    
    if(!part2)
        return ans;
    return '';
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);