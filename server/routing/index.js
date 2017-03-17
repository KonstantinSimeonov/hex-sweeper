'use strict';

const fs = require('fs');

module.exports = ({ server, controllers, middlewares }) => fs.readdirSync(__dirname).forEach(fileName => {
    if(fileName !== 'index.js') {
        require(`${__dirname}/${fileName}`)(server, controllers, middlewares);
    }
});