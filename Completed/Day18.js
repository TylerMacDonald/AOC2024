const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}

var filename = 'Completed/Day18Input.txt'
var part2 = false;

function parse(text){
    let lines = file.getSample(text).trim();
    lines = lines.split('\n').map(ele=>ele.split(',').map(Number));
    return lines;
}

function shortestPath(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    const directions = [
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
        [-1, 0]  // up
    ];

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] === '.' && !visited[x][y];
    }

    let queue = [[0, 0, 0]]; 
    let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[0][0] = true;

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        if (x === rows - 1 && y === cols - 1) {
            return steps;
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValid(newX, newY)) {
                visited[newX][newY] = true;
                queue.push([newX, newY, steps + 1]);
            }
        }
    }
    return -1;
}

function initgrid(size){
    let grid = [];
    for(let i=0; i<size; i++){
        let line = '';
        for(let x=0; x<size; x++){
            line+='.';
        }
        grid.push(line.split(''));
    }
    return grid;
}

function solve(p2){
    let byte = 1024;
    let size = 71;
    let grid =  initgrid(size);
    let program = parse(filename);
    if(p2){
        byte = program.length;
    }
    for(let i = 0; i<byte; i++){
        let [c,r] = program[i];
        grid[r][c]='#';
        if(p2){
            if(shortestPath(grid)==-1)
                return ''+c+','+r
        }
    }
    return shortestPath(grid);
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);