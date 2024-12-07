const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'input.txt'
var lines = [];
let part2 = false;

function parse(text){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    lines = lines.split('\n');
    //let values = lines.map(ele=>ele.split(': ')[0]).map(e=>Number(e));
    //let nums = lines.map(ele=>ele.split(': ')[1].split(' ').map(e=>Number(e)));
    return lines;
}

function solve(p2){
    part2 = p2;
    let res = parse(filename);
    let ans = 0;
    for(let i=0; i<res.length; i++){
    }
    return ans;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);