'use strict';

const logic = require('./logic/logic-provider');

const STORAGE = Object.create(null);

STORAGE.games = [];

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        const field = logic.generateField(8, 'high');

        STORAGE.games.push(field);
        
        socket.emit('fieldReady', field);
    });
}