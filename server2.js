const express = require('express');
const fs = require('fs');

const app = express();

console.time('santa');

const santaFile = fs.readFileSync('./santafile.txt').toString().split('');

let floorCount = 0;
let basement = 0;


for (let i=0; i<santaFile.length;i++){
    if(santaFile[i]==='('){
        floorCount++;
    } else {
        floorCount--;
    }
    if (floorCount==-1){
        basement = i+1;
        break;
    }
}

// santaFile.forEach(element => {
//     if (element==='('){
//         floorCount++;
//     } else {
//         floorCount--;
//     }
// });

console.log(floorCount);
console.log('position:', basement);
console.timeEnd('santa');