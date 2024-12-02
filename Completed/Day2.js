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

    lines = lines.trim().split('\n');
    nums1 = [];
    nums2 = [];
    for (let i=0; i<lines.length; i++){
        let level = lines[i].split(' ').map(x=>Number(x));
        levels.push(level);
    }
    return levels;
}

function checkLevel(level){
    let direction = 0;
    let safe = true;
    for(let x=1; x<level.length; x++){
        if(Math.abs(level[x-1]-level[x])>3 || Math.abs(level[x-1]-level[x])<1){
            safe=false;
            break;
        }
        if(direction==1){
            if(level[x-1]-level[x]>0){
                safe=false;
                break;
            }
        }
        if(direction==-1){
            if(level[x-1]-level[x]<0){
                safe=false;
                break;
            }
        }
        if(direction==0){
            if(level[x-1]-level[x]>0){
                direction=-1;
            }else{
                direction=1;
            }
        }
    }
    return safe;
}

function solve(part2){
    let count = 0;
    if(!part2){
        for(let i=0; i<levels.length; i++){
            let safe = checkLevel(levels[i])
            console.log(i, levels[i], safe);
            if(safe){
                count++;
            }
        }
    }else{
        for(let i=0; i<levels.length; i++){
            let level = levels[i];
            let safe = checkLevel(level);
            if(!safe){
                for(let x=0; x<level.length; x++){
                    let temp = [...level];
                    temp.splice(x,1);
                    if(checkLevel(temp)){
                        safe = true;
                        break;
                    }
                }
            }
            if(safe){
                count++;
            }
        }
    }
    return count;
}

let levels = parse("Completed/Day2Input.txt",false);

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);