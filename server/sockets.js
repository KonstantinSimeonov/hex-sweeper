'use strict';

const GameSession = require('./sockets/game-session'),
    SpectateSession = require('./sockets/spectate-session'),
    gameStorage = require('./sockets/games-storage');

const gamingSessions = {},
    spectatingSessions = {};

module.exports = function (server, { serverConfig, dataServices: { gamesService } }) {
    const io = require('socket.io')(server, { transports: ['websocket'] });
    io.on('connection', socket => {
        console.log('je suis konektive');
        const isSpectate = socket.request._query.type === 'spectate';
        if (isSpectate) {
            const { id } = socket.request._query,
                sessionToSpectate = gamingSessions[id];

            const spectateSession = SpectateSession.from(socket, sessionToSpectate);

            sessionToSpectate.spectators.push(spectateSession);

            // TODO: clean up spectator sessions here
        } else {
            const gameSession = GameSession.from(socket, gamesService);
            gamingSessions[gameSession.gameId] = gameSession;
            socket.on('disconnect', () => { delete gamingSessions[gameSession.userSession.id]; })
        }
    });
};
