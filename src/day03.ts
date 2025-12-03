import fs from "node:fs";
import * as console from "node:console";

function solvePart1(inputString: string, debug: boolean): void {
    const lines = inputString.split("\n");
    const maxVolatages: number[] = [];
    for (let line of lines) {
        const maxVolatage: number = processBank(line, debug);
        maxVolatages.push(maxVolatage)
    }
    if (maxVolatages.length == 0) {
        console.log("No result for part 1 :(");
        return;
    }
    const result = maxVolatages.reduce((a, b) => a + b);
    console.log("Result for Part 1:", result);
}


function processBank(batteryBank: string, debug: boolean): number {
    let max1 = -99;
    let idx1 = -1;
    let max2 = -99;
    let idx2 = -1;

    batteryBank.split("")
               .forEach((digit, index)=> {
                   if (index == batteryBank.length - 1) {
                       return;
                   }
                   const digitNumber = Number.parseInt(digit);
                   if (digitNumber > max1) {
                       max1 = digitNumber;
                       idx1 = index;
                   }
    })

    batteryBank.substring(idx1 + 1)
               .split("")
               .forEach((digit, index) => {
                   const digitNumber = Number.parseInt(digit);
                   if (digitNumber > max2) {
                       max2 = digitNumber;
                       idx2 = index;
                   }
               })

    if (debug) {console.log("Line:", batteryBank)
        console.log("Numbers:", max1, max2)
        console.log("Index:", idx1, idx2)
        console.log();
    }
    return Number.parseInt(max1.toString() + max2.toString());
}


function solvePart2(inputString: string, debug: boolean): void {
    const lines = inputString.split("\n");
    const maxVolatages: number[] = [];
    for (let line of lines) {
        const maxVolatage: number = processBankPart2(line, debug);
        maxVolatages.push(maxVolatage)
    }
    if (maxVolatages.length == 0) {
        console.log("No result for part 2 :(");
        return;
    }
    const result = maxVolatages.reduce((a, b) => a + b);
    console.log("Result for Part 2:", result);
}


function processBankPart2(batteryBank: string, debug: boolean): number {
   const digitsNeeded = 12;
   let lastDigitIdx = -1;
   const digits: string[] = [];

   for (let neededLength = digitsNeeded; neededLength >= 1; neededLength--) {
       let maxDigit = -1;
       let digitIdx = -1;

       const startIdx = lastDigitIdx + 1;
       const endIdx = batteryBank.length - (neededLength - 1);
       const subString = batteryBank.substring(startIdx, endIdx);

       console.log("Substring:", subString, "start idx:", lastDigitIdx + 1, "end idx:", endIdx);
       subString
           .split("")
           .forEach((digit, index) => {
               const digitNumber = Number.parseInt(digit);
               if (digitNumber > maxDigit) {
                   maxDigit = digitNumber;
                   digitIdx = index + lastDigitIdx + 1;
               }
       })
       digits.push(maxDigit.toString());
       lastDigitIdx = digitIdx;
       console.log("max Digit",maxDigit)
       console.log("max Digit Idx",lastDigitIdx)
   }

   const resultString: string = digits.reduce((a, b) => a + b, "");
    if (debug) {
        console.log("Line:", batteryBank);
        console.log("Digits:", digits);
        console.log("Number:", resultString);
        console.log();
    }

    return Number.parseInt(resultString);
}


const inputPath = "input/day03.txt";
const inputBuffer = fs.readFileSync(inputPath);
const inputString = inputBuffer.toString()

solvePart1(inputString, false)
solvePart2(inputString, true)