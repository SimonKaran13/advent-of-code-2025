import fs from "node:fs";
import * as console from "node:console";

const inputPath = "input/day04-test.txt";
const inputBuffer = fs.readFileSync(inputPath);
const inputString = inputBuffer.toString()
const lines = inputString.split("\n");
const matrix = lines.map(line => line.split(""));

// @ts-ignore
const ROW_LENGTH = lines[0].length;
const ROWS = lines.length;


function hasLessThanFourAdjecentRolls(matrix: string[][], y: number, x: number): boolean {
    if ((x === 0 && y === 0) ||
        (x === ROW_LENGTH - 1 && y === 0) ||
        (x === 0 && y === ROWS - 1) ||
        (x === ROW_LENGTH - 1 && y === ROWS - 1)) {
        return true;
    }

    let adjecent_rolls = 0;
    // @ts-ignore
    const right = x + 1 < ROW_LENGTH ? matrix[y][x + 1] : "";
    // @ts-ignore
    const left = x - 1 >= 0 ? matrix[y][x - 1] : "";
    // @ts-ignore
    const up = y - 1 >= 0 ? matrix[y - 1][x]: "";
    // @ts-ignore
    const down = y + 1 < ROWS ? matrix[y + 1][x] : "";
    // @ts-ignore
    const up_right = y - 1 >= 0 && x + 1 < ROW_LENGTH ? matrix[y - 1][x + 1] : "";
    // @ts-ignore
    const up_left = x - 1 >= 0 && y - 1 >= 0 ? matrix[y - 1][x - 1] : "";
    // @ts-ignore
    const down_right = x + 1 < ROW_LENGTH && y + 1 < ROWS ? matrix[y + 1][x + 1] : "";
    // @ts-ignore
    const down_left = x - 1 >= 0 && y + 1 < ROWS ? matrix[y + 1][x - 1] : "";
    if (right === "@" || right === "x") {adjecent_rolls++;}
    if (left === "@" || left === "x") {adjecent_rolls++;}
    if (up === "@" || up === "x") {adjecent_rolls++;}
    if (down === "@" || down === "x") {adjecent_rolls++;}
    if (up_right === "@" || up_right === "x") {adjecent_rolls++;}
    if (up_left === "@" || up_left === "x") {adjecent_rolls++;}
    if (down_right === "@" || down_right === "x") {adjecent_rolls++;}
    if (down_left === "@" || down_left === "x") {adjecent_rolls++;}
    return adjecent_rolls < 4;
}

function countRolls(matrix: string[][]): number {
    let rollCount = 0;
    for (let y = 0; y < ROWS; y++) {
        const chars = [];
        for (let x = 0; x < ROW_LENGTH; x++) {
            // @ts-ignore
            if (matrix[y][x] === "@") {
                if (hasLessThanFourAdjecentRolls(matrix, y, x)) {
                    // @ts-ignore
                    matrix[y][x] = "x";
                    rollCount++;
                }
            }
            // @ts-ignore
            chars.push(matrix[y][x])
        }
        // console.log(chars.reduce((a, b) => a + b))
    }
    return rollCount;
}

function removeRolls(matrix: string[][]): void {
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < ROW_LENGTH; x++) {
            // @ts-ignore
            if (matrix[y][x] === "x") {
                // @ts-ignore
                matrix[y][x] = ".";
            }
        }
    }
}

let totalRollCount = countRolls(matrix);

console.log("Accessible rolls (Part 1):", totalRollCount);


let rollsRemoved = totalRollCount;
do {
    removeRolls(matrix);
    rollsRemoved = countRolls(matrix);
    totalRollCount += rollsRemoved;
} while (rollsRemoved > 0)

console.log("Removed rolls (Part 2):", totalRollCount);
