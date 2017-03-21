'use strict';

const gameStorage = require('./games-storage');

class SpectateSession {
    static from(socket, gameSession) {
        return new SpectateSession(socket, gameSession);
    }

    constructor(socket, gameSession) {
        this.socket = socket;
        const { userId } = socket.request.query,
            game = gameStorage.getGame(userId);

        if(game) {
            this.socket.emit('spectate:success', game.field);
            gameSession.socket.on('updates', updates => this.socket.emit('updates', updates));
        } else {
            this.socket.emit('spectate:error', { message: 'Game not found!' })
        }
    }
}

module.exports = SpectateSession;