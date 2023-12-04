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

replaceInFile(`../${year}/package.json`, /\$year/gm, year.toString());
replaceInFile(`../${year}/.env`, /\$year/gm, year.toString());

process.chdir(`../${year}`);
exec("npm i")

function replaceInFile(file, regex, replacement) {
    readFile(file, (err, data) => {
        if (err)
            throw err;
        const result = data.toString().replace(regex, replacement);
        writeFile(file, result, 'utf8', (err) => {
            if (err)
                throw err;
        });
    });
}