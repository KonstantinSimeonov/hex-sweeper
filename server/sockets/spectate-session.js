'use strict';

const gameStorage = require('./games-storage');

class SpectateSession {
    static from(socket, gameSession) {
        return new SpectateSession(socket, gameSession);
    }

    constructor(socket, gameSession) {
        this.socket = socket;
        const { id: gameTmpId } = socket.request._query,
            game = gameStorage.getGameByTmpId(gameTmpId);
            console.log(`GAME WEWEWEW ${game}`);
        if(game) {
            console.log('GAME ON');
            this.socket.emit('spectate:success', { size: (game.field.length + 1) / 2 });
            this.socket.emit('updates', game.updates);
            gameSession.socket.on('updates', updates => this.socket.emit('updates', updates));
        } else {
            this.socket.emit('spectate:error', { message: 'Game not found!' });
        }
    }
}

module.exports = SpectateSession;
