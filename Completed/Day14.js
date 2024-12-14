const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}

var filename = 'Completed/Day14Input.txt'
var part2 = false;
var width = 101;
var height = 103;
let midX = Math.floor(width/2);
let midY = Math.floor(height/2);

function parse(text){
    let lines = file.getSample(text).trim();
    lines = lines.split('\n');
    let count = 0;
    let robots = [];
    for(let line of lines){
        let split = line.split(' ').map(ele=>ele.split('=')[1].split(',').map(x=>Number(x)));
        let ID = count;
        let P = split[0];
        let V = split[1];
        count++;
        robots.push({P,V});
    }
    return robots;
}

function score(bots){
    let quad = [0,0,0,0];
    for (let {P,V} of bots){
        let [x,y] = P;
        if(x==midX || y==midY){
            continue;
        }
        if(x<midX && y<midY)
            quad[0]++;
        if(x<midX && y>midY)
            quad[1]++;
        if(x>midX && y<midY)
            quad[2]++;
        if(x>midX && y>midY)
            quad[3]++;
    }
    return quad[0]*quad[1]*quad[2]*quad[3];
}

function progress(P,V){
    let tx = P[0]+V[0];
    let ty = P[1]+V[1];
    tx = (tx + width * 9999) % width;
    ty = (ty + height * 9999) % height;
    return [tx,ty];
}

function solve(p2){
    part2 = p2
    let robots = parse(filename);
    for(let i=0; i<100000; i++){
        let seen = new Set();
        let found =  true;
        for(let i=0; i<robots.length; i++){
            let key = makeKey(robots[i].P);
            if(seen.has(key)){
                found = false;
            }else{
                seen.add(key);
            }
            robots[i].P = progress(robots[i].P,robots[i].V);
        }
        if(i==99 && !part2)
            return score(robots);
        if(found){
            return i;
        }
    }
    return -1;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);