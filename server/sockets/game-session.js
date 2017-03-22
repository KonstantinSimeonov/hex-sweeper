'use strict';

const jwt = require('jsonwebtoken'),
    uuid = require('node-uuid');

// TODO: dependency injection
const { createField, revealCellAt, serializeCellUpdate, countCellsInHexagon } = require('../logic'),
    inMemoryGameStorage = require('./game-storage'),
    serverConfig = require('../server-config');

/**
 * Represents a game sessions. Accepts a socket and games db services.
 */
class GameSession {
    static from(socket, gamesService, highscoresService) {
        return new GameSession(socket, gamesService, highscoresService);
    }

    constructor(socket, gamesService, highscoresService) {
        this.spectators = [];
        this.socket = socket;
        this.gamesService = gamesService;
        this.highscoresService = highscoresService;
        this.gameId = uuid.v1();

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
            this.userSession = { id: uuid.v1(), gameId: this.gameId, anonymous: true };
            this.socket.emit('idAssigned', jwt.sign(JSON.stringify(this.userSession), serverConfig.secret));
        } else {
            this.socket.on('save', this.saveGame.bind(this));
            this.socket.on('load', this.loadGame.bind(this));
        }

        this.socket.on('move', this.onClientGameMove.bind(this));
        this.socket.on('initGame', this.initGame.bind(this));
    }

    /**
     * Creates a new game based on request parameters.
     * The created field is stored via in-memory storage.
     */
    initGame(request) {
        const {
            fieldSize,
            minesCount,
            spectatable
        } = request,
            field = createField(fieldSize, minesCount);

        inMemoryGameStorage.storeGame(this.userSession.id, this.gameId, field,
            {
                spectatable,
                minesCount,
                fieldSize,
                freeCells: countCellsInHexagon(fieldSize) - minesCount
            });
        this.socket.emit('initGame:success');
    }

    /**
     * Execute a move on the game associated with the gaming session.
     * The revealed cells are stored as update objects in the form of { row, col, value },
     * compressed and sent to the client.
     */
    onClientGameMove({ row, col }) {
        const gameToUpdate = inMemoryGameStorage.getGameByUserId(this.userSession.id);

        if (gameToUpdate.field[row][col] === -1) {
            this.socket.emit('gameover').disconnect();
            this.spectators.forEach(spec => spec.socket.emit('gameover').disconnect());
            return;
        }

        const gameUpdates = [];

        revealCellAt(row, col, gameToUpdate.field, (coordinates, newValue) =>
            gameUpdates.push(serializeCellUpdate(coordinates.row, coordinates.col, newValue)));

        inMemoryGameStorage.update(this.userSession.id, gameUpdates);
        this.socket.emit('updates', gameUpdates);
        // console.log(this.spectators);
        this.spectators.forEach(spec => spec.socket.emit('updates', gameUpdates));

        if (gameToUpdate.details.freeCells <= 0) {
            this.onWin(gameToUpdate);
        }
    }

    onWin(wonGame) {
        this.socket.emit('win').disconnect();
        this.spectators.forEach(spec => spec.socket.emit('win').disconnect());
        this.gamesService.save(wonGame, this.userSession.id);
        this.highscoresService.create(wonGame, this.userSession.username);
    }

    // TODO: propagate errors to client in a meaningful way

    /**
     * Saves a game to persistent storage so it can be loaded later.
     * Depends on games service. Emits events to the sockets on success or failure.
     */
    saveGame() {
        this.gamesService.save(inMemoryGameStorage.getGameByUserId(this.userSession.id), this.userSession.id)
            .then(() => console.log('saved') || this.socket.emit('save:success'))
            .catch(() => this.socket.emit('save:failure'));
    }

    /**
     * Load a game from either in-memory or the persistent storage, preferring the in-memory storage.
     * The loaded game is emitted to the client.
     * The loading is done via user id.
     */
    loadGame() {
        const userId = this.userSession.id,
            gameToLoad = inMemoryGameStorage.getGameByUserId(userId);
        console.log(gameToLoad);
        if (gameToLoad) {
            const { updates, details } = gameToLoad;
            this.socket.emit('load:success', { size: (gameToLoad.field.length + 1) / 2 });
            this.socket.emit('updates', updates);
        } else {
            this.gamesService.recoverLast(userId)
                .then(([game]) => {
                    inMemoryGameStorage.storeGame(userId, game.field, game.tmpId, game.details);
                    const { updates, details } = game;

                    this.socket.emit('load:success', { size: (game.field.length + 1) / 2 });
                    this.socket.emit('updates', updates);
                })
                .catch(err => console.log(err) || this.socket.emit('load:failure'));
        }
    }
}

module.exports = GameSession;
