import * as fs from "node:fs";
import * as console from "node:console";

class LockPasswordCracker {
    constructor(protected dialPosition: number = 50, protected zeroCount: number = 0) {
    }

    public rotateRight(steps: number) {
        for (let i = 1; i <= steps; i++) {
            this.dialPosition++;
            if (this.dialPosition > 99) {
                this.dialPosition = 0;
            }
        }
        if (this.dialPosition == 0) {
            this.zeroCount++;
        }
    }

    public rotateLeft(steps: number) {
        for (let i = 1; i <= steps; i++) {
            this.dialPosition--;
            if (this.dialPosition < 0) {
                this.dialPosition = 99;
            }
        }
        if (this.dialPosition == 0) {
            this.zeroCount++;
        }
    }

    public getZeroCount() {
        return this.zeroCount
    }
}

const inputPath = "input/day01.txt";
const inputBuffer = fs.readFileSync(inputPath);
const inputString = inputBuffer.toString()
const rotationList = inputString.split("\n");

const crackerPart1 = new LockPasswordCracker();

rotationList.forEach(rotation => {
    if (rotation.startsWith("R")) {
        crackerPart1.rotateRight(parseInt(rotation.substring(1)));
    } else if (rotation.startsWith("L")) {
        crackerPart1.rotateLeft(parseInt(rotation.substring(1)));
    } else {
        throw new Error("Invalid rotation: " + rotation);
    }
});

console.log("Part 1 Password for the input is: " + crackerPart1.getZeroCount());


class LockPasswordCracker2 extends LockPasswordCracker {
    override rotateRight(steps: number) {
        for (let i = 1; i <= steps; i++) {
            this.dialPosition++;
            if (this.dialPosition > 99) {
                this.dialPosition = 0;
            }
            if (this.dialPosition == 0) {
                this.zeroCount++
            }
        }
    }

    override rotateLeft(steps: number) {
        for (let i = 1; i <= steps; i++) {
            this.dialPosition--;
            if (this.dialPosition < 0) {
                this.dialPosition = 99;
            }
            if (this.dialPosition == 0) {
                this.zeroCount++
            }
        }
    }
}

const crackerPart2 = new LockPasswordCracker2();
rotationList.forEach(rotation => {
    if (rotation.startsWith("R")) {
        crackerPart2.rotateRight(parseInt(rotation.substring(1)));
    } else if (rotation.startsWith("L")) {
        crackerPart2.rotateLeft(parseInt(rotation.substring(1)));
    } else {
        throw new Error("Invalid rotation: " + rotation);
    }
});

console.log("Part 2 Password for the input is: " + crackerPart2.getZeroCount());
