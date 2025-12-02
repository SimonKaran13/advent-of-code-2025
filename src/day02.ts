import fs from "node:fs";
import * as console from "node:console";

const inputPath = "input/day02.txt";
const inputBuffer = fs.readFileSync(inputPath);
const inputString = inputBuffer.toString()
const rangeStringList = inputString.split(",");

const ranges = rangeStringList.map(range => {
    const [min, max] = range.split("-").map(Number) as [number, number];
    return {min, max};
})

const invalidIdsPart1: number[] = [];
const invalidIdsPart2: number[] = [];


const isInvalidIdPart1 = (id: number) : boolean => {
    const idString = id.toString();
    if (idString.length % 2 !== 0) {
        return false;
    }
    const firstHalf = idString.substring(0, id.toString().length / 2);
    const secondHalf = idString.substring(id.toString().length / 2);

    return firstHalf === secondHalf;
}

const isInvalidIdPart2 = (id: number) : boolean => {
    const idString = id.toString();
    const idLength = idString.length;

    if (idLength < 2) {
        return false;
    }

    const calculatePossibleSubstringLenghts = (stringLength: number) : number[] => {
        const result: number[] = [1];
        for (let i = 2; i < stringLength; i++) {
            const division: number = stringLength / i;
            if (Number.isInteger(division)) {
                result.push(i);
            }
        }
        return result;
    }

    for (let substringLength of calculatePossibleSubstringLenghts(idLength)) {
        const substrings: string[] = [];
        for (let i = 0; i < idString.length; i += substringLength) {
            substrings.push(idString.slice(i, i + substringLength));
        }
        if (substrings.every(substring => substring === substrings[0])) {
            return true;
        }
    }

    return false;
}

ranges.forEach(({min, max}) => {
    for (let id = min; id <= max; id++) {
        if (isInvalidIdPart1(id)) {
            invalidIdsPart1.push(id);
        }
        if (isInvalidIdPart2(id)) {
            invalidIdsPart2.push(id);
        }
    }
});

if (invalidIdsPart1.length === 0) {
    console.log("No invalid for Part 1 found");
} else {
    console.log("Part 1 solution:", invalidIdsPart1.reduce((a, b) => a + b));
}

if (invalidIdsPart2.length === 0) {
    console.log("No invalid IDs for Part 2 found");
} else {
    console.log("Part 2 solution:", invalidIdsPart2.reduce((a, b) => a + b));
}

