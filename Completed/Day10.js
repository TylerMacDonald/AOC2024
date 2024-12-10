const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
var filename = 'Completed/Day10Input.txt'
var part2 = false;
var rows = 0;
var cols = 0;
var map = [];
var memo = [];

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1] // Up, Down, Left, Right
];

function isValid(x, y, prevHeight) {
    if(x >= 0 && x < rows && y >= 0 && y < cols)
        if(map[x][y] === prevHeight + 1)
            return true;
    return false
}

function calculateScore(startX, startY) {
    let visited = new Set();
    let queue = [[startX, startY]];
    let reachable = new Set();

    while (queue.length > 0) {
        let [x, y] = queue.shift();
        let key = makeKey(x,y);
        
        if (visited.has(key)) continue;
        visited.add(key);
        if (map[x][y] === 9) {
            reachable.add(key);
            continue; // Stop traversing from a 9
        }
        for (let [dx, dy] of directions) {
            let nx = x + dx;
            let ny = y + dy;
            if (isValid(nx, ny, map[x][y])) {
                queue.push([nx, ny]);
            }
        }
    }

    return reachable.size;
}

function countPaths(x, y) {
    if (map[x][y] === 9) 
        return 1;
    if (memo[x][y] !== null) 
        return memo[x][y];

    let totalPaths = 0;
    for (let [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        if (isValid(nx, ny, map[x][y])) {
            totalPaths += countPaths(nx, ny);
        }
    }

    memo[x][y] = totalPaths;
    return totalPaths;
}

function parse(text){
    var lines = [];
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    return lines.split('\n').map(ele=>ele.split('').map(e=>isNaN(e)?'.':Number(e)));
}

function solve(p2){
    part2 = p2
    map = parse(filename);
    rows = map.length;
    cols = map[0].length;
    memo = Array.from({ length: rows }, () => Array(cols).fill(null));
    let ans = 0;
    let ans2 = 0;
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (map[x][y] === 0) {
                if(part2)
                    ans2+=countPaths(x,y);
                else
                    ans += calculateScore(x, y);
            }
        }
    }
    if(!part2)
        return ans;
    return ans2;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);