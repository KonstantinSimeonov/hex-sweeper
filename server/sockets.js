'use strict';

const uuid = require('fs')

const { createField, revealCellAt } = require('./logic');

const STORAGE = Object.create(null);

STORAGE.games = {};



module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        const { size, mines } = socket.request._query;

        const field = createField(+size, +mines);

        socket.emit('fieldReady', field);
    });
}