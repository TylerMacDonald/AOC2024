const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}

const A = 4;
const B = 5;
const C = 6;
reg = [0,1,2,3,4,5,6,'ERROR'];
var filename = 'Completed/Day17Input.txt'
var part2 = false;
let instruction = 0;

function opCode(code,op){
    let literal = op;
    let combo = reg[op];
    if(code==0)
        reg[A] = Math.floor(reg[A]/Math.pow(2,combo));
    if(code==1)
        reg[B] = reg[B]^literal;
    if(code==2)
        reg[B] = combo%8;
    if(code==3 && reg[A]!==0){
        instruction=literal-2;
    }
    if(code==4)
        reg[B] = reg[B]^reg[C];
    if(code==5)
        return ''+Math.abs(combo%8);
    if(code==6)
        reg[B] = Math.floor(reg[A]/Math.pow(2,combo));
    if(code==7)
        reg[C] = Math.floor(reg[A]/Math.pow(2,combo));
}

function parse(text){
    let lines = file.getSample(text).trim();
    lines = lines.split('\n\n');
    let temp = lines[0].split('\n').map(ele=>Number(ele.split(': ')[1]));
    reg[A]=temp[0];
    reg[B]=temp[1];
    reg[C]=temp[2];
    let program = lines[1].split(': ')[1].split(',').map(Number)
    return program;
}

function compareArray(arr1,arr2){
    if(arr1.length != arr2.length)
        return false;
    for(let i=0; i<arr1.length; i++){
        if(arr1[i]!==arr2[i])
            return false;
    }
    return true;
}

function solve(p2){
    part2 = p2
    let program = parse(filename);
    let values = [];
    while(instruction<program.length){
        let temp =  opCode(program[instruction],program[instruction+1]);
        if(temp)
            values.push(temp);
        instruction+=2;
    }
    if(!part2)
        return values.join(',');

 
    let count = 37221000000000; 
    let a = 4;
    //Kept doubling a start until i was in the right ballpark, where I was getting the right amount of values (before optimization), 
    //and added 1000000000 to the start over and over until I produced consistent results of 7+ matchess.
    //Switched match code to break the moment we didn't get in sequence, and let it run testing every 4th case.
    while (true){
        if(values.length>=7){
            console.log(count-1,values.join(','));
        }
        reg[A] = count;
        reg[B] = 0;
        reg[C] = 0;
        instruction = 0;
        values=[];
        while(instruction<program.length){
            let temp =  opCode(program[instruction],program[instruction+1]);
            instruction+=2;
            if(temp){
                if(temp==program[values.length]){ 
                    //after getting in the right ballpark I changed it to only look for continuous sequence.
                    values.push(temp);
                    if(values.length==program.length)
                        return count;  // Return when we find the match.
                }else{
                    break;
                }
            }
        }
        count+=a;
    }

}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);