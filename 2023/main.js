const { log } = require('console');
require('dotenv').config();
process.chdir(`./day_${process.env.DAY}/`);
log(`Running day ${process.env.DAY}...`);
require(`./day_${process.env.DAY}/main.js`);