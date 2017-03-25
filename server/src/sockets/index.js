'use strict';

const GameSession = require('./game-session'),
    SpectateSession = require('./spectate-session');

const gameSessionStorage = Object.create(null);

module.exports = function (server, { serverConfig, dataServices: { gamesService, highscoresService } }) {
    const io = require('socket.io')(server, { transports: ['websocket'] });

    io.on('connection', socket => {
        console.log(`Connection: ${socket.request._query.token}`);

        const isSpectateSessions = socket.request._query.type === 'spectate';

        if (isSpectateSessions) {
            const { id } = socket.request._query,
                gameSessionToSpectate = gameSessionStorage[id],
                spectateSession = SpectateSession.from(socket, gameSessionToSpectate);
                
            gameSessionToSpectate.spectators.push(spectateSession);
        } else {
            const newGameSessions = GameSession.from(socket, gamesService, highscoresService);

            gameSessionStorage[newGameSessions.gameId] = newGameSessions;
            socket.on('disconnect', () => { delete gameSessionStorage[newGameSessions.userSession.id]; })
        }
    });
};
