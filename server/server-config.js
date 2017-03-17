'use strict';

module.exports = Object.freeze({
    secret: process.env.secret || 'purple unicorn',
    dbUri: process.env.dbUri || 'mongodb://localhost:27017/minesweeper',
    port: process.env.port || 6969
});