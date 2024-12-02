const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
var lines = [];
function parse(text, part2){
    let levels = [];
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }

    lines = lines.split('\n');
    //numArray =  lines[i].split(' ').map(x=>Number(x));
    return lines;
}

function solve(part2){
    let count = 0;
    if(!part2){

    }else{

    }
    return count;
}

//parse("sample.txt",false);
//console.log(parse(1,false))
let levels = parse("input.txt",false);

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);