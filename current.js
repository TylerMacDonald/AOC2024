const file = require("./utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}
const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]  //Up Down Left Right
]
var filename = 'input.txt'
var part2 = false;
var rows, cols, map;

function parse(text){
    var lines = [];
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    return lines.split('\n').map(e=>e.split(''));
}

function solve(p2){
    part2 = p2
    map = parse(filename);
    rows = map.length;
    cols = map[0].length;
    let p1ans = 0;
    let p2ans = 0;
    for(let x=0; x<rows; x++){
        for(let y=0; y<cols; y++){
        }
    }
    if(!part2)
        return p1ans;
    return p2ans;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);