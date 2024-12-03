const file = require("../utils/import");
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
    if(part2){
        return lines.match(/do\(\)|don't\(\)|mul(\()(-){0,1}(\d){1,3}(,)(-){0,1}(\d){1,3}(\))/g);
    }
    return lines.match(/mul(\()(-){0,1}(\d){1,3}(,)(-){0,1}(\d){1,3}(\))/g);
}

function solve(part2){
    let input = parse("Completed/Day3input.txt",part2);
    let score = 0;
    let enabled=true;
    for(let i=0; i<input.length; i++){
        if(input[i]=='do()'){
            enabled=true;
        }else if(input[i]==`don't()`){
            enabled=false;
        }else{
            if(enabled){
                let cur = input[i].split("mul(")[1].split(")")[0].split(",");
                score+=(Number(cur[0])*Number(cur[1]))
            }
        }
    }
    return score;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);