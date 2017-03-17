'use strict';

const fs = require('fs');

module.exports = (dbCollections) => fs.readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.js')
    .map(fileName => ({
        name: fileName.split('-').shift() + 'Service',
        value: require(`${__dirname}/${fileName}`)(dbCollections)
    }))
    .reduce((map, service) => (map[service.name] = service.value, map), Object.create(null));
    