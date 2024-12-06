const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'Completed/Day6Input.txt'
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


function runLoop(table,newR,newC,dir,loop,part2){
    if(part2)
        loop.add(makeKey(newR,newC,dir))
    else
        loop.add(makeKey(newR,newC))
    let loopFound = false;
    while (!loopFound){
        let [dx,dy] = directions[dir];
        newR+=dx;
        newC+=dy;
        if(newR<0||newR>=table.length||newC<0||newC>=table[0].length){
            break;
        }
        if(table[newR][newC]!='#'){
            if(part2){
                let key = makeKey(newR,newC,dir);
                if(loop.has(key)){
                    loopFound = true;
                    break;
                }
                loop.add(key);
            }else{
                loop.add(makeKey(newR,newC));
            }
        }else{
            newR-=dx;
            newC-=dy;
            dir=(dir+1)%4;
        }
    }
    if(part2){
        return loopFound;
    }
    return loop;
}

function solve(part2){
    let results = parse(filename,part2);
    let startR;
    let startC;
    for(let i=0; i<results.length; i++){
        let index = results[i].indexOf('^');
        if (index>0){
            startR=i;
            startC=index;
        }
    }
    let ans2 = 0;
    let found = Array.from(runLoop(results,startR,startC,0,new Set(),false));
    if(!part2)
        return found.length;

    for(let i=0; i<found.length; i++){
        let [newR,newC] = found[i].split('[')[1].split(']')[0].split(',').map(ele=>Number(ele));
        if(results[newR][newC]=='.'){
            let table = parse(filename,part2);
            table[newR][newC]='#';
            let res = runLoop(table,startR,startC,0,new Set(),part2);
            if(res){
                ans2++;
            }
        }
    }
    return ans2;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);