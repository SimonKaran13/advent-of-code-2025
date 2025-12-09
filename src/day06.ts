import fs from "node:fs";
import * as console from "node:console";

type Operation = '*' | '+';

function calculate(numbers: number[], operation: Operation): number {
    if (operation === '*') {
        return numbers.reduce((a, b) => a * b, 1);
    } else if (operation === '+') {
        return numbers.reduce((a, b) => a + b, 0);
    } else {
        throw new Error("Unsupported operation: " + operation);
    }
}

function solvePart1(inputString: string): number {
    const lines = inputString.split("\n").filter(line => line.length > 0);
    const trimmedLines = lines.map(line => line.trim().split(/ +/))
    const maxLength = Math.max(...trimmedLines.map(line => line.length));

    // console.log(trimmedLines)

    const solutions: number[] = [];
    for (let x = 0; x < maxLength; x++) {
        const numbers: number[] = [];
        for (let y = 0; y < trimmedLines.length - 1; y++) {
            const line = trimmedLines[y];
            if (line === undefined) {
                throw new Error("Line " + y + " is undefined");
            }
            const value = line[x];
            if (value === undefined) {
                throw new Error("Value y=" + y + " x=" + x + " is undefined");
            }
            numbers.push(Number.parseInt(value));
        }
        // console.log("Numbers:", numbers)
        // @ts-ignore
        const operation: Operation = trimmedLines[trimmedLines.length - 1][x];
        // console.log("Operation:", operation)
        solutions.push(calculate(numbers, operation));
    }

    return solutions.reduce((a, b) => a + b, 0);
}

function solvePart2(inputString: string): bigint {
    const lines = inputString.split("\n");

    const map = new Map<number, string[]>();

    for (let line of lines) {
        if (!line || line.trim().length === 0) {
            continue;
        }

        const arr = line.split("");
        for (let i = 0; i < arr.length; i++) {
            if (!map.has(i)) {
                map.set(i, []);
            }
            map.get(i)!.push(arr[i]!)
        }
    }

    let multiplication = false;
    let sum = 0n;
    let intSum = 0n;
    for (let ent of map.values()) {
        if (ent[ent.length - 1] === "+") {
            multiplication = false;
            intSum = 0n;
        } else if (ent[ent.length - 1] === "*") {
            multiplication = true;
            intSum = 0n;
        }

        let strVal = '';
        for (let i = 0; i < ent.length - 1; i++) {
            strVal += ent[i];
        }
        if (!strVal || strVal.trim().length === 0) {
            sum += intSum;
            continue;
        }

        let val = BigInt(strVal.replace(/ /g, ''));
        if (multiplication) {
            if (intSum === 0n) {
                intSum = val;
            } else {
                intSum *= val;
            }
        } else {
            intSum += val;
        }
    }
    return sum;
}

const inputPath = "input/day06-test.txt";
const inputBuffer = fs.readFileSync(inputPath);
const inputString = inputBuffer.toString();

const resultPart1 = solvePart1(inputString);
console.log("Part 1 Total:", resultPart1);

const resultPart2 = solvePart2(inputString);
console.log("Part 2 Total:", resultPart2);

