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
    lines = lines.split('\n\n');
    let rules =  lines[0].split('\n').map(line=>line.split('|').map(Number));
    let updates = lines[1].split('\n').map(line=>line.split(',').map(Number))
    return [rules, updates];
}

//Part 1, check if the update is in the right orderr.
function isUpdateInOrder(update, rules) {
    for (let [before, after] of rules) {
        let beforeIndex = update.indexOf(before);
        let afterIndex = update.indexOf(after);
        if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex) {
            return false;
        }
    }
    return true;
}

//part 2, if update not in right order. topologically sort and return sorted.
function reorderUpdate(update, rules) {
    let graph = new Map();
    let inDegree = new Map();
    for (let page of update) {
        graph.set(page, []);
        inDegree.set(page, 0);
    }
    for (let [before, after] of rules) {
        if (update.includes(before) && update.includes(after)) {
            graph.get(before).push(after);
            inDegree.set(after, (inDegree.get(after) || 0) + 1);
        }
    }
    let queue = [];
    for (let [page, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(page);
    }
    let sorted = [];
    while (queue.length > 0) {
        let current = queue.shift();
        sorted.push(current);
        for (let neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        }
    }
    return sorted;
}

function solve(part2){
    let results = parse("Completed/Day5input.txt",part2);
    let rules = results[0];
    let updates = results[1];
    let part1ans = 0;
    let part2ans = 0;
    for (let update of updates) {
        //part1, just do the ones already in the right order.
        if (isUpdateInOrder(update, rules)) {
            part1ans += update[Math.floor(update.length / 2)];
        }else{
            //part2, reorder the update and sum the middle page for incorrectly ordered.
            let reordered = reorderUpdate(update, rules);
            part2ans += reordered[Math.floor(reordered.length / 2)];
        }
    }
    if(part2){
        return part2ans;
    }
    return part1ans;
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);