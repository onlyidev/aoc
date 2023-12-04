const { log } = require("console");
const { readFileSync } = require("fs");

const input = readFileSync(`./${process.argv[2]}`, "utf8").split("\n");

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

class Card {
    constructor(id, winning, present) {
        this.id = id;
        this.winning = winning
        this.present = present
    }

    getWins() {
        const actualWins = this.present.filter(el => this.winning.includes(el));
        return actualWins.length === 0 ? 0 : Math.pow(2, actualWins.length - 1);
    }

    getWinCount() {
        const actualWins = this.present.filter(el => this.winning.includes(el));
        return actualWins.length;
    }

}

const cards = [];
for (let i = 0; i < input.length; i++) {
    const id = /Card\s+(\d+):/g.exec(input[i])[1];
    const winning = /(\d+\s*)+\|/g.exec(input[i])[0].split(/\s+/).map(Number).filter(el => !isNaN(el)).filter(onlyUnique);
    const present = /\|\s+(\d+\s*)+/g.exec(input[i])[0].split(/\s+/).map(Number).filter(el => !isNaN(el)).filter(onlyUnique);
    cards.push(new Card(id, winning, present))
}

const part1 = cards.map(card => card.getWins()).reduce((a, b) => a + b, 0);
log(`Part 1: ${part1}`);
const t1 = new Date();
for (let i = 0; i < cards.length; i++) {
    const indices = new Array(cards[i].getWinCount()).fill(0).map((_, j) => Number(cards[i].id) + j);
    for (let j of indices)
        cards.push(cards[j]);
}
log(`Part 2: ${cards.length}`);
const t2 = new Date()
log(`Part 2 took ${t2 - t1}ms to complete!`);