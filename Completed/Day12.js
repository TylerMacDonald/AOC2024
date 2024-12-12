const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
const getValues = (str)=>{
    return JSON.parse(str);
}

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]  //Up Down Left Right
]

var filename = 'Completed/Day12input.txt'
var part2 = false;
var rows, cols, map, done;

function parse(text){
    var lines = [];
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    return lines.split('\n').map(e=>e.split(''));
}

function findRegion(pos){
    let queue = [pos];
    let area = [pos];
    let perimeter = [];
    let seen = new Set();

    while (queue.length) {
        let [x, y] = queue.shift();
        seen.add(makeKey(x, y));
        let cur = map[x]?.[y];
        for(let i=0; i<directions.length; i++){
            let nx = x + directions[i][0];
            let ny = y + directions[i][1];
            if (seen.has(makeKey(nx, ny))) 
                continue;
            let ncur = map[nx]?.[ny];
            if (!ncur || ncur !== cur) {
                perimeter.push([nx, ny, i]);
                continue;
            }
            area.push([nx, ny]);
            done.add(makeKey(nx, ny));
            seen.add(makeKey(nx, ny));
            queue.push([nx, ny]);
        }
    }
    return [map[pos[0]][pos[1]],area.length,perimeter]
};

function countSides (perimeter, dir){
    //Walls in this direction
    let pts = perimeter.filter(wall => wall[2] === dir);
    let XMag = Math.abs(directions[dir][0]); //X Magnitude
    let YMag = Math.abs(directions[dir][1]); //Y Magnitude
    let count = 0;
    //Unique values only
    let temp =  Array.from(new Set(pts.map(ele => ele[YMag])));
    for (let i = 0; i < temp.length; i++) {
        let current = temp[i];
        let relPoints = pts.filter((ele) => ele[YMag] === current);
        let relOther = relPoints.map(ele=>ele[XMag]);
        relOther.sort((a, b) => a - b);
        //If first element, we return [1], otherwise compute the difference between the current item and previous.
        let side = relOther.flatMap((ele, i, arr) => (i == 0 ? [1] : [ele - arr[i - 1]]));
        // look at only the instances of line that are > 1, and add them to the count;
        count += side.filter(ele => ele > 1).length + 1;
    }
    return count;
};

function findSides(perimeter){
    let total = 0;
    for (let i=0; i<4; i++){
        total += countSides(perimeter, i);
    }
    return total;
};

function solve(p2){
    part2 = p2
    map = parse(filename);
    rows = map.length;
    cols = map[0].length;
    done = new Set();
    result = [];
    for(let x=0; x<rows; x++){
        for(let y=0; y<cols; y++){
            if (done.has(makeKey(x, y))) {
                continue;
            }
            let region = findRegion([x, y]);
            result.push(region);
        }
    }
    let p1ans = 0;
    let p2ans = 0;
    for(let i=0; i<result.length; i++){
        let cur = result[i];
        let area = cur[1];
        let perim = cur[2];
        p1ans += area * perim.length;
        p2ans += area * findSides(perim);
    }
    if(!part2)
        return p1ans;
    return p2ans;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);
