const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
var lines = [];
function parse(text, part2){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }

    lines = lines.split('\n');
    return lines.map(row => row.split(''));
}



function solve(part2){
    let grid = parse("completed/Day4input.txt",false);
    let word = 'XMAS'
    let wordLength = word.length;
    let count = 0;
    function checkDirection(x, y, dx, dy) {
        for (let i = 0; i < wordLength; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[x].length || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    }
    if(!part2){
        count=0;
        // Check all possible starting points in the grid
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                // Check in all 8 directions
                const directions = [
                    [0, 1],   // Right
                    [1, 0],   // Down
                    [1, 1],   // Down-Right
                    [1, -1],  // Down-Left
                    [0, -1],  // Left
                    [-1, 0],  // Up
                    [-1, -1], // Up-Left
                    [-1, 1],  // Up-Right
                ];

                for (const [dx, dy] of directions) {
                    if (checkDirection(x, y, dx, dy)) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    //just check for the thing specifically for part 2... fuck directions.
    count=0;
    for(let j=1; j<grid.length-1; j++){
        for(let i=1; i<grid[j].length-1; i++){
            if(grid[j][i]=='A'){
                if((    (grid[j-1][i+1]=='S' && grid[j+1][i-1]=='M') || (grid[j-1][i+1]=='M' && grid[j+1][i-1]=='S')) 
                    && ((grid[j-1][i-1]=='S' && grid[j+1][i+1]=='M') || (grid[j-1][i-1]=='M' && grid[j+1][i+1]=='S'))){
                    count++;
                }
            }
        }
    }
    return count;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);