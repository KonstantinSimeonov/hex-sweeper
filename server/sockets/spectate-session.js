'use strict';

const gameStorage = require('./game-storage');

class SpectateSession {
    static from(socket, gameSession) {
        return new SpectateSession(socket, gameSession);
    }

    constructor(socket, gameSession) {
        this.socket = socket;
        const { id: gameTmpId } = socket.request._query,
            gameToSpectate = gameStorage.getGameByGameId(gameTmpId);
            
        if(gameToSpectate) {
            this.socket.emit('spectate:success', { size: (gameToSpectate.field.length + 1) / 2 });
            this.socket.emit('updates', gameToSpectate.updates);
            gameSession.socket.on('updates', updates => this.socket.emit('updates', updates));
        } else {
            this.socket.emit('spectate:error', { message: 'Game not found!' });
        }
    }
}

module.exports = SpectateSession;
