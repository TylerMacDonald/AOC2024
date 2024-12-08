const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'Completed/Day8Input.txt'
var lines = [];
let part2 = false;
let rows = 0;
let cols = 0;
let groups = {};
function parse(text){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    lines = lines.split('\n');
    return lines;
}

function solve(p2){
    part2 = p2;
    let grid = parse(filename);
    rows =  grid.length;
    cols = grid[0].length;
    groups = {};
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let char = grid[r][c];
            if (char !== ".") {
                if(!groups[char]){
                    groups[char] = [];
                }
                groups[char].push({r, c})
            }
        }
    }

    let antinodes = new Set();

    for (let freq in groups){
        let group = groups[freq];
        if (group.length < 2)
                continue;
        for(let i=0; i<group.length; i++){
            for(let j=i+1; j<group.length; j++){
                let a1 = group[i];
                let a2 = group[j];
                let dr = a2.r - a1.r;
                let dc = a2.c - a1.c;
                if(!part2){
                    let mids = [{r: a1.r - dr, c: a1.c - dc}, {r: a2.r + dr, c: a2.c + dc}]
                    for(let x=0; x<mids.length; x++){
                        if(mids[x].r>= 0 && mids[x].r < rows && mids[x].c >= 0 && mids[x].c < cols){
                            antinodes.add(makeKey(mids[x].r,mids[x].c));
                        }
                    }
                }else{
                    group.forEach(({r, c}) => antinodes.add(makeKey(r,c)));
                    for (let multiplier = 1; ; multiplier++) {
                        let outOfBounds = true;
                        let r1 = a1.r - (dr * multiplier);
                        let c1 = a1.c - (dc * multiplier);
                        if (r1 >= 0 && r1 < rows && c1 >= 0 && c1 < cols) {
                            antinodes.add(makeKey(r1,c1));
                            outOfBounds = false;
                        }
                        let r2 = a2.r + (dr * multiplier);
                        let c2 = a2.c + (dc * multiplier);
                        if (r2 >= 0 && r2 < rows && c2 >= 0 && c2 < cols) {
                            antinodes.add(makeKey(r2,c2));
                            outOfBounds = false;
                        }
                        if (outOfBounds) break;
                    }
                }
            }
        }
    }
    return antinodes.size;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);