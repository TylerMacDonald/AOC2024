const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
var filename = 'Completed/Day11Input.txt'
var part2 = false;

function splitStone(num) {
    let numStr = num.toString();
    let mid = Math.floor(numStr.length / 2);
    let left = parseInt(numStr.slice(0, mid), 10);
    let right = parseInt(numStr.slice(mid), 10);
    return [left, right];
}

function transformStone(stone) {
    if (stone === 0) {
        return [1];
    } else if (stone.toString().length % 2 === 0) {
        return splitStone(stone);
    } else {
        return [stone * 2024];
    }
}

function parse(text){
    var lines = [];
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    return lines.split(' ').map(e=>Number(e));
}

function solve(p2){
    part2 = p2
    let stones = parse(filename);
    let numBlinks = part2?75:25;
    let frequency = new Map();
    for (let i=0; i<stones.length; i++) {
        frequency.set(stones[i], (frequency.get(stones[i]) || 0) + 1);
    }

    for (let blink = 0; blink < numBlinks; blink++) {
        if(!part2 && blink==25){
            return stones.length;
        }
        let newFrequency = new Map();

        for (let [stone, count] of frequency.entries()) {
            let transformedStones = transformStone(stone);
            for (let newStone of transformedStones) {
                newFrequency.set(newStone, (newFrequency.get(newStone) || 0) + count);
            }
        }

        frequency = newFrequency;
    }

    let totalStones = 0;
    for (let count of frequency.values()) {
        totalStones += count;
    }

    return totalStones;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);