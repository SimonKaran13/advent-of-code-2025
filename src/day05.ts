import fs from "node:fs";
import * as console from "node:console";

const inputPath = "input/day05.txt";
const inputBuffer = fs.readFileSync(inputPath);
const inputString = inputBuffer.toString()

const [rangesString, idsString] = inputString.split("\n\n");
if (rangesString === undefined) {
    throw new Error(`Invalid ranges`);
}
if (idsString === undefined) {
    throw new Error(`Invalid IDs`);
}

type Range = {min: number, max: number}

function isValidInRanges(id: number, ranges: Range[]): boolean {
    for (let range of ranges) {
        if (id >= range.min && id <= range.max) {
            // console.log("Valid ID:",id,"in range:",range)
            return true;
        }
    }
    return false;
}

const ranges: Range[] = rangesString.split("\n").map(range => {
    const [min, max] = range.split("-");
    if (min === undefined || max === undefined) {
        throw new Error(`Invalid range`);
    }
    return {
        "min": Number.parseInt(min),
        "max": Number.parseInt(max)
    }
});

const ids: number[] = idsString.split("\n").map(id => Number.parseInt(id));
const validIdsCount: number = ids.filter(id => isValidInRanges(id, ranges)).length;
console.log("Valid IDs for Part 1:", validIdsCount);

function mergeRanges(ranges: Range[]): Range[] {
    const sortedRanges = ranges.sort((a, b) => a.min - b.min);
    const result: Range[] = [];

    outer:
    for (let range of sortedRanges) {
        for (let resultRange of result) {
            if (range.min >= resultRange.min && range.min <= resultRange.max) {
                resultRange.max = Math.max(resultRange.max, range.max);
                continue outer;
            }
        }
        result.push(range)
    }

    return result;
}

const mergedRanges = mergeRanges(ranges)
// console.log(mergedRanges)

const validIdsPart2 = mergedRanges.map(range => range.max - range.min + 1).reduce((a, b) => a + b);
console.log("Valid IDs for Part 2:", validIdsPart2)