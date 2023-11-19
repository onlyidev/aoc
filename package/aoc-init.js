const log = console.log;
const { exec } = require('child_process');
const { readdirSync, lstatSync, mkdirSync, cpSync, readFile, writeFile } = require('fs');
log("Another Year for Advent of Code!");

const allFiles = readdirSync('.');
const dirs = allFiles.filter(file => lstatSync(file).isDirectory());
const year = new Date().getFullYear();

mkdirSync(`../${year}`);

if (allFiles.includes(".template"))
    cpSync(".template", `../${year}/`, { recursive: true });

readFile(`../${year}/package.json`, (err, data) => {
    if (err)
        throw err;
    const result = data.toString().replace(/\$year/gm, year.toString());
    console.log(result);
    writeFile(`../${year}/package.json`, result, 'utf8', (err) => {
        if (err)
            throw err;
    });
});

process.chdir(`../${year}`);
exec("npm i && npx aoc")