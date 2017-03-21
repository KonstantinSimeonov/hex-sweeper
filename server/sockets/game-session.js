'use strict';

const jwt = require('jsonwebtoken'),
    uuid = require('node-uuid');

// TODO: dependency injection
const { createField, revealCellAt } = require('../logic'),
    gameStorage = require('./games-storage'),
    serverConfig = require('../server-config'),
    { gamesService } = require('../data/services');

class GameSession {
    static from(socket) {
        return new GameSession(socket);
    }

    constructor(socket) {
        this.socket = socket;
        const { token } = socket.request._query;

        let anonymous = !token;

        if (token) {
            try {
                this.userSession = jwt.verify(token, serverConfig.secret);
            } catch (error) {
                anonymous = true;

            }
        }

        if (anonymous) {
            this.userSession = { id: uuid.v1(), anonymous: true };
            this.socket.emit('idAssigned', jwt.sign(JSON.stringify(this.userSession), serverConfig.secret));
        }

        if (!anonymous) {
            this.socket.on('save', this.saveGame.bind(this));
            this.socket.on('load', this.loadGame.bind(this));
        }

        this.socket.on('move', this.move.bind(this));
        this.socket.on('initGame', this.initGame.bind(this));
    }

    initGame(request) {
        const {
            fieldSize,
            minesCount,
            spectatable
        } = request,
            field = createField(fieldSize, minesCount);

        gameStorage.storeGame(this.userSession.id, field, spectatable);

        this.socket.emit('initGame:success');
    }

    move({ row, col }) {
        const game = gameStorage.getGame(this.userSession.id),
            updates = [];

        revealCellAt(row, col, game.field, function (coordinates, newValue) {
            updates.push({
                row: coordinates.row,
                col: coordinates.col,
                value: newValue
            });
        });

        gameStorage.update(this.userSession.id, updates);
        this.socket.emit('updates', updates);
    }

    saveGame() {
        gamesService.save(gameStorage.getGame(this.userSession.id))
            .then(() => this.socket.emit('save:successful'))
            .catch(console.log);
    }
}

module.exports = GameSession;