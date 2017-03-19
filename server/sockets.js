'use strict';

const uuid = require('fs')

const { createField, revealCellAt } = require('./logic');

const STORAGE = Object.create(null);

STORAGE.games = {};

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('connected');
        const { size, mines } = socket.request._query;

        const field = createField(+size, +mines);

        socket.emit('fieldReady', field);

        socket.on('move', data => {
            console.log('move');
            const { row, col } = data;

            if(field[row][col] === -1) {
                socket.emit('gameover');
                return;
            }

            const updates = [];

            revealCellAt(row, col, field, ({ row: r, col: c }, value) => updates.push({ row: r, col: c, value }));
            console.log(updates);
            socket.emit('fieldUpdate', updates);
        });
    });
}