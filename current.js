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
    lines = lines.split('\n');
    return lines.map(row => row.split(''));
}

function solve(part2){
    let grid = parse("sample.txt",false);
    let count = 0;
    if(!part2){
        count=0;

        return count;
    }
    return count;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);