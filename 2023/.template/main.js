const { log } = require("console");
const { readFileSync } = require("fs");

const input = readFileSync(`./${process.argv[2]}`, "utf8").split("\n");

log(input);