const { log } = require("console");
const { readFileSync } = require("fs");

const input = readFileSync(`./${process.argv[2]}`, "utf8").split("\n");

const times = Array.from(input[0].matchAll(/\d+/g)).map(el => Number(el[0]))
const distances = Array.from(input[1].matchAll(/\d+/g)).map(el => Number(el[0]))

const minusPlus = (a, b) => [a - b, a + b]

const solveQuadratic = (a, b, c) => {
    const d = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
    return minusPlus(-b, d).map(el => el / (2 * a))
}

const checkVieto = (b, c, t1, t2) => t1 * t2 === c && t1 + t2 === -b

let possibilites = [];
for (let i = 0; i < times.length; ++i) {
    possibilites.push(getPossibilities(times[i], distances[i]));
}

function getPossibilities(time, distance) {
    let [t1, t2] = solveQuadratic(1, -time, distance);
    t1 = Math.ceil(t1);
    t2 = Math.floor(t2);
    if (checkVieto(-time, distance, t1, t2))
        return t2 - t1 - 1;
    else
        return t2 - t1 + 1;
}

const part1 = possibilites.reduce((a, b) => a * b, 1);
log(`Part 1: ${part1}`);

const time = Number(input[0].replaceAll(/\s/g, "").match(/\d+/g)[0]);
const distance = Number(input[1].replaceAll(/\s/g, "").match(/\d+/g)[0]);

const part2 = getPossibilities(time, distance);
log(`Part 2: ${part2}`);