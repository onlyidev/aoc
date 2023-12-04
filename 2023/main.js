const { log } = require('console');
require('dotenv').config();
process.chdir(`./day_${process.env.DAY}/`);
log(`Running day ${process.env.DAY}...`);
const t1 = new Date();
require(`./day_${process.env.DAY}/main.js`);
const t2 = new Date();
log(`Day ${process.env.DAY} took ${t2 - t1}ms to complete!`);