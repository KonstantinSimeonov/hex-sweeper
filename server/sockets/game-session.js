'use strict';

const jwt = require('jsonwebtoken'),
    uuid = require('node-uuid');

// TODO: dependency injection
const { createField, revealCellAt } = require('../logic'),
    gameStorage = require('./games-storage'),
    serverConfig = require('../server-config');

function serializeCellUpdate(row, col, value) {
    return (row << 11) | (col << 4) | value;
}

class GameSession {
    static from(socket, gamesService) {
        return new GameSession(socket, gamesService);
    }

    constructor(socket, gamesService) {
        this.spectators = [];
        this.socket = socket;
        this.gamesService = gamesService;
        console.log(socket.request._query);
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
        } else {
            this.socket.on('save', this.saveGame.bind(this));
            this.socket.on('load', this.loadGame.bind(this));
        }

        this.socket.on('move', this.move.bind(this));
        this.socket.on('initGame', this.initGame.bind(this));
        this.gameId = uuid.v1();
    }

    initGame(request) {
        const {
            fieldSize,
            minesCount,
            spectatable
        } = request,
            field = createField(fieldSize, minesCount);

        gameStorage.storeGame(this.userSession.id, this.gameId, field, { spectatable, minesCount });
        this.socket.emit('initGame:success');
    }

    move({ row, col }) {
        const game = gameStorage.getGame(this.userSession.id),
            updates = [];

        revealCellAt(row, col, game.field, (coordinates, newValue) => {
            updates.push(serializeCellUpdate(coordinates.row, coordinates.col, newValue));
        });

        gameStorage.update(this.userSession.id, updates);
        this.socket.emit('updates', updates);
        this.spectators.forEach(spec => spec.socket.emit('updates', updates));

        if (game.details.minesLeft <= 0) {
            this.socket.emit('win');
        }
    }

    saveGame() {
        console.log('aaaa are we');
        this.gamesService.save(gameStorage.getGame(this.userSession.id), this.userSession.id)
            .then(() => this.socket.emit('save:success'))
            .catch(console.log);
    }

    loadGame() {
        const userId = this.userSession.id,
            game = gameStorage.getGame(userId);

        if (game) {
            this.socket.emit('updates', game.updates);
        } else {
            this.gamesService.recoverLast(userId)
                .then(([game]) => {
                    gameStorage.storeGame(userId, game.field, game.details);
                    const { updates, details } = game;

                    this.socket.emit('load:success', { size: (game.field.length + 1) / 2 });
                    this.socket.emit('updates', { updates, details });
                })
                .catch(() => this.socket.emit('load:failure'));
        }
    }
}

module.exports = GameSession;