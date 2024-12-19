const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}
let sum = 0;
var filename = 'Completed/Day19input.txt'
var part2 = false;

function parse(text){
    let lines = file.getSample(text).trim();
    lines = lines.split('\n\n');
    let patterns = lines[0].split(', ').map(v => v.split(''));
    let goal = lines[1].split('\n');
    return [patterns, goal];
}

function checkTowel(towel, patterns) {
    let memo = {};

    function findMatches(index){
        if (memo[index] !== undefined) 
            return memo[index];
        if (index == towel.length) 
            return 1;

        let matches = [];
        for (let p of patterns) {
            let isMatch = true;
            for (let i = 0; i < p.length; i++) {
                if (towel[index + i] === undefined || towel[index + i] !== p[i]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                matches.push(p);
            }
        }
        let res = 0;
        for (let match of matches) {
            res += findMatches(index + match.length);
        }
        memo[index] = res;
        return res;
    }

    return findMatches(0);
}

function solve(p2){
    part2 = p2
    let [patterns,goals] = parse(filename);
    patterns.sort((a, b) => b.length - a.length);
    let count = 0;
    for(let i=0; i<goals.length; i++){
        let res = checkTowel(goals[i], patterns);
        count += res > 0 ? 1 : 0;
        sum += res;
    }
    console.log(`Part 1: ${count}`);
    return sum;
}

console.log(`Part 2: ${solve(true)}`);