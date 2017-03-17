'use strict';

const fs = require('fs');

module.exports = dependencies => fs.readdirSync(__dirname)
                    .filter(fileName => fileName !== 'index.js')
                    .map(fileName => ({
                        name: fileName.split('-').shift() + 'Controller',
                        create: require(`${__dirname}/${fileName}`)
                    }))
                    .reduce((map, controller) => (map[controller.name] = controller.create(dependencies), map), Object.create(null));
