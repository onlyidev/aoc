#! /usr/bin/env node

const log = console.log;
const { readdirSync, lstatSync, mkdirSync, cpSync, readFile, writeFile } = require('fs');
log("Another day for Advent of Code!");

const dayRegex = /day_\d\d?/;

const allFiles = readdirSync('.');
const dirs = allFiles.filter(file => lstatSync(file).isDirectory() && dayRegex.test(file));
const lastDay = parseInt(dirs.sort().pop()?.split('').at(-1) ?? 0);
const day = lastDay + 1;

log(`Welcome to day ${day}!`);
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