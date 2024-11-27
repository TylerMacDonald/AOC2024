const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
var lines = [];
function parse(text, part2){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }


    return lines;
}


function solve(part2){
    let sum = 0;
    return sum;
}


//parse(1,false);
//parse("input.txt",false);
parse("sample.txt",false);
console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);