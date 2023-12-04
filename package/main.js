#! /usr/bin/env node
require('dotenv').config();
const jsdom = require("jsdom");

const log = console.log;
const { readdirSync, lstatSync, mkdirSync, cpSync, readFile, writeFile } = require('fs');
log("Another day for Advent of Code!");

const dayRegex = /day_\d\d?/;

const allFiles = readdirSync('.');
const dirs = allFiles.filter(file => lstatSync(file).isDirectory() && dayRegex.test(file));
const lastDay = parseInt(dirs.sort().pop()?.split('').at(-1) ?? 0);
const day = lastDay + 1;
const year = process.env.YEAR;


log(`Welcome to day ${day}!`);
function prepareDirectory() {
    mkdirSync(`day_${day}`);
    if (allFiles.includes(".template"))
        cpSync(".template", `day_${day}/`, { recursive: true });
    if (allFiles.includes(".env"))
        readFile(".env", (err, data) => {
            if (err)
                throw err;
            const result = data.toString().replace(/DAY=\d\d?/g, `DAY=${day}`);
            writeFile(".env", result, 'utf8', (err) => {
                if (err)
                    throw err;
            });
        });
}
// Get input from AOC
async function getInput() {
    const t = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: process.env.COOKIE
        }
    });
    writeFile(`day_${day}/input.txt`, await t.text(), 'utf8', (err) => {
        if (err)
            throw err;
    });
    log("Input received from AoC!");
}

async function getTestInput() {
    const doc = await jsdom.JSDOM.fromURL(`https://adventofcode.com/${year}/day/${day}`, {
        resources: new jsdom.ResourceLoader({
            fetch: {
                headers: {
                    cookie: process.env.COOKIE
                }
            }
        })
    });
    writeFile(`day_${day}/test.txt`, doc.window.document.querySelector("pre>code").textContent, 'utf8', (err) => {
        if (err)
            throw err;
    });
    log("Test input received from AoC!");
}
prepareDirectory();
getInput();
getTestInput();