const { log, debug } = require("console");
const { readFileSync } = require("fs");

const input = readFileSync(`./${process.argv[2]}`, "utf8").split("\n");

class MapFragment {
    constructor(order) {
        this.order = order;
        this.dest = 0;
        this.source = 0;
        this.length = 0;
    }

    maxSource() {
        return this.source + this.length;
    }

    maxDestination() {
        return this.dest + this.length;
    }
}

class SeedMap {
    constructor(name) {
        this.name = name;
        this.fragments = [];
    }

    fillGaps(minVal, maxVal) {
        const sortedBySource = this.fragments.sort((a, b) => a.source - b.source);
        for (let i = 0; i < sortedBySource.length; i++) {
            minVal = Math.min(minVal, sortedBySource[i].source);
            if (minVal >= sortedBySource[i].source) {
                minVal = sortedBySource[i].maxSource();
                continue;
            }
            const frag = new MapFragment(sortedBySource[i].order / 2.0);
            frag.source = minVal;
            frag.dest = minVal;
            frag.length = sortedBySource[i].source - minVal;
            minVal = sortedBySource[i].source
            sortedBySource.splice(i, 0, frag);
        }
        if (sortedBySource.at(-1).maxSource() < maxVal) {
            const frag = new MapFragment(sortedBySource.at(-1).order + 1);
            frag.source = sortedBySource.at(-1).maxSource();
            frag.dest = frag.source;
            frag.length = maxVal - frag.source;
            sortedBySource.push(frag);
        }
        this.fragments = sortedBySource
    }

    remap(anotherMap) {

    }

}


const seeds = /(\d+\s*)+/.exec(input[0])[0].split(/\s+/).map(Number);
const maps = ["sts", "stf", "ftw", "wtl", "ltt", "tth", "htl"].map(el => new SeedMap(el));
input.splice(0, 1); // Remove Seeds

const slicers = [0];
while (input.indexOf("", slicers.at(-1) + 1) !== -1) {
    slicers.push(input.indexOf("", slicers.at(-1) + 1));
}
const inputMaps = slicers.map((el, i) => input.slice(el + 2, slicers[i + 1] || input.length)).filter(el => el.length > 0);
for (let i = 0; i < maps.length; i++) {
    for (let j = 0; j < inputMaps[i].length; j++) {
        const a = Array.from(inputMaps[i][j].matchAll(/\d+/g)).map(el => Number(el[0]));
        const frag = new MapFragment(j);
        frag.dest = a[0];
        frag.source = a[1];
        frag.length = a[2];
        maps[i].fragments.push(frag);
    }
}

const minSeed = Math.min(...seeds), maxSeed = Math.max(...seeds);
maps[0].fillGaps(minSeed, maxSeed);
log(maps[0].fragments)

// const actualSeeds = []
// for (let i = 0; i < seeds.length; i += 2) {
//     actualSeeds.push(new Seed(seeds[i], seeds[i + 1]));
// }

// let min = Infinity;
// for (const seed of actualSeeds) {
//     const it = seed.generateIterator();
//     while (true) {
//         const { value, done } = it.next();
//         if (done) break;
//         min = Math.min(min, seedJourney(value));
//     }
// }
// log(min); // Part 2

// NOTE: part1 was solved the naive way, part2 was running out of memory. Tried to refactor, but decided that I had wasted enough time. Onto day 6!