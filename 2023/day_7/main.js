const { log } = require("console");
const { readFileSync } = require("fs");

const input = readFileSync(`./${process.argv[2]}`, "utf8").split("\n");

const Types = {
    "5": "Five of a kind",
    "1,4": "Four of a kind",
    "2,3": "Full house",
    "1,1,3": "Three of a kind",
    "1,2,2": "Two pair",
    "1,1,1,2": "One pair",
    "1,1,1,1,1": "High card"
}
const JokerMap = {
    "1,1,1,1,1": {
        1: "One pair"
    },
    "1,1,1,2": {
        1: "Three of a kind",
        2: "Three of a kind"
    },
    "1,1,1,1,2": {
        1: "Three of a kind",
        2: "Three of a kind"
    },
    "1,2,2": {
        1: "Full house",
        2: "Four of a kind"
    },
    "1,1,3": {
        1: "Four of a kind",
        3: "Four of a kind"
    },
    "2,3": {
        2: "Five of a kind",
        3: "Five of a kind"
    },
    "1,4": {
        1: "Five of a kind",
        4: "Five of a kind"
    },
    "5": {
        5: "Five of a kind"
    }
}
const OrderPart1 = "AKQJT98765432";
const OrderPart2 = "AKQT98765432J";

class Hand {
    constructor(cards, bid) {
        this.cards = cards;
        this.type = this.#getType(cards);
        this.type2 = this.#getTypePart2(cards);
        this.bid = bid;
    }

    #getType(cards) {
        return Types[Util.scanRepeats(cards)];
    }

    #getTypePart2(cards) {
        const repeats = Util.scanRepeats(cards);
        const jokers = (cards.match(/J/g) || []).length;
        return JokerMap[repeats]?.[jokers] ?? Types[repeats];
    }
}

let part2 = false;
function compareHands(a, b) {
    const order = part2 ? OrderPart2 : OrderPart1;
    const aType = part2 ? a.type2 : a.type;
    const bType = part2 ? b.type2 : b.type;
    if (aType === bType) {
        let i = 0;
        while (a.cards[i] === b.cards[i] && i < a.cards.length) {
            i++;
        }
        return order.indexOf(a.cards[i]) - order.indexOf(b.cards[i]);
    } else {
        const types = Object.values(Types);
        return types.indexOf(aType) - types.indexOf(bType);
    }
}

const Util = {
    scanRepeats: (cards) => {
        const tmp = cards.split("").sort();
        const reps = [];
        let currCount = 1;
        for (let i = 1; i < tmp.length; i++) {
            if (tmp[i - 1] === tmp[i]) {
                currCount++;
            } else {
                reps.push(currCount);
                currCount = 1;
            }
        }
        reps.push(currCount);
        return reps.sort().toString();
    }
}

function parseInput(input) {
    return input.map((line) => {
        if (line === "") return;
        const [cards, bid] = line.split(" ");
        return new Hand(cards, bid);
    }).filter(el => el !== undefined);
}

{
    const hands = parseInput(input).sort(compareHands).reverse();
    const sum = hands.reduce((acc, hand, i) => (i + 1) * hand.bid + acc, 0);
    log(`Part 1: ${sum}`);
}

{
    part2 = true;
    const hands = parseInput(input).sort(compareHands).reverse();
    const sum = hands.reduce((acc, hand, i) => (i + 1) * hand.bid + acc, 0);
    log(`Part 2: ${sum}`);
}
