const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);
};
let filename = 'Completed/Day9Input.txt'
var lines = [];
let part2 = false;

function parse(text){
    if(isNaN(text)){
        lines = file.getSample(text).trim();
    }else{
        lines = file.getInput(text).trim();
    }
    return lines.split('').map(ele=>Number(ele));
}

function getCheckSum(block){
    let checkSum = 0;
    for (let i=0; i<block.length; i++){
        if(isNaN(block[i]))
            continue;
        checkSum+=(i*block[i]);
    }
    return checkSum;
}

function solve(p2){
    part2 = p2;
    let res = parse(filename);
    let ans = 0;
    let curID = 0;
    let block = [];
    let files = [];
    for(let i=0; i<res.length; i++){
        let input =  i%2==0?curID:'.';
        if(input=='.' && res[i]==0){
            continue;
        }
        for(let x=0; x<res[i]; x++){
            block.push(input);
        }
        files.push([input, res[i]]);
        if(i%2==0){
            curID++;
        }
    }
    let temp = [];
    let pullFrom = block.length-1;
    if(!part2){
        for(let i=0; i<block.length; i++){
            if(pullFrom<i){
                break;
            }
            if(block[i]=='.'){
                while(block[pullFrom]=='.' && pullFrom>=i){
                    pullFrom--;
                }
                if(pullFrom<=i){
                    temp.push(block[i+1]);
                    break;
                }
                temp.push(block[pullFrom]);
                block[pullFrom]='.';
                pullFrom--;
            }else{
                temp.push(block[i]);
            }
        }
        return getCheckSum(temp);
    }

    for(let i=curID-1; i>=0; i--){
        let idIndex = files.findIndex(block=>block[0]==i);
        let [name,size] = files[idIndex];
        let freeIndex = files.findIndex(block=>block[0]=='.' && block[1]>=size);
        if(!freeIndex || idIndex<freeIndex){
            continue;
        }
        files[idIndex][0]='.';
        files[freeIndex][0]=name;
        if(files[freeIndex][1]>size){
            files.splice(freeIndex+1,0,['.',files[freeIndex][1]-size]);
        }
        files[freeIndex][1]=size;
    }
    let final = [];
    for(let i = 0; i<files.length; i++){
        for(let x = 0; x<files[i][1]; x++){
            final.push(files[i][0]);
        }
    }
    return getCheckSum(final);
}


console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);