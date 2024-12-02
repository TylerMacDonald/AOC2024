const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
var lines = [];
let nums1 = [];
let nums2 = [];
function parse(text, part2){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }

    lines = lines.trim().split('\n');
    nums1 = [];
    nums2 = [];
    for (let i=0; i<lines.length; i++){
        let line = lines[i].split('   ');
        //console.log(line);
        nums1.push(Number(line[0]));
        nums2.push(Number(line[1]));
    }
    return lines;
}


function solve(part2){
    nums1.sort();
    nums2.sort();
    if(!part2){
        let dist = 0;
        for(let i=0; i<nums1.length; i++){
            dist+=Math.abs(nums1[i]-nums2[i]);
        }
        return dist;
    }
    let sim = 0;
    for(let i=0; i<nums1.length; i++){
        let count = nums2.filter(num => num==nums1[i]).length || 0;
        //console.log(nums1[i], count, count*nums1[i]);
        sim += (count*nums1[i]);
    }
    return sim;
}

//parse("sample.txt",false);
//console.log(parse(1,false))
parse("Completed/Day1Input.txt",false);

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);