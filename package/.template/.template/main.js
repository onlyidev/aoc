const { log } = require("console");
const { readFileSync } = require("fs");

const input = readFileSync("./input.txt", "utf8").split("\n");

log(input);