const file = require("../utils/import");
const makeKey = (...args)=>{
    return JSON.stringify(args);;
};
const getValues = (str)=>{
    return JSON.parse(str)[0];
}

var filename = 'Completed/Day13Input.txt'
var part2 = false;

function parse(text){
    let lines = file.getSample(text).trim();
    let blocks = lines.split('\n\n');
    let machines = [];
    for(let machine of blocks){
        machine = machine.split('\n');
        let buttonA = machine[0].split(', Y+').map((ele,i)=>i==0?Number(ele.split('+')[1]):Number(ele));
        let buttonB = machine[1].split(', Y+').map((ele,i)=>i==0?Number(ele.split('+')[1]):Number(ele));
        let prize = machine[2].split(', Y=').map((ele,i)=>i==0?Number(ele.split('=')[1]):Number(ele));
        if(part2){
            prize[0]+=10000000000000
            prize[1]+=10000000000000
        }
        machines.push({
            A:buttonA,
            B:buttonB,
            P:prize
        });
    }
    return machines;
}

function solve(p2){
    part2 = p2
    let claws = parse(filename);
    let ans = 0;
    for (let {A,B,P} of claws) {
        let difPB = (P[0] * B[1]) - (P[1] * B[0]);
        let difAB = (A[0] * B[1]) - (A[1] * B[0]);
        let difAP = (A[0] * P[1]) - (A[1] * P[0]);
        let button1 = difPB / difAB;
        let button2 = difAP / difAB;

        if (button1%1==0 && button2%1==0) {
            ans += button1*3 + button2;
        }
    }
    return ans;
}

console.log(`Part 1: ${solve(false)}`);
console.log(`Part 2: ${solve(true)}`);