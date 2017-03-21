'use strict';

const GameSession = require('./sockets/game-session'),
    SpectateSession = require('./sockets/spectate-session');

const gamingSessions = {},
    spectatingSessions = {};

module.exports = function (server, serverConfig) {
    const io = require('socket.io')(server, { transports: ['websocket'] });

    io.on('connection', socket => {
        console.log('je suis konektive');
        const isSpectate = socket.request._query.type === 'spectate';
        
        if(isSpectate) {
            const { playingUserId } = socket.request._query,
                sessionToSpectate = gamingSessions[playingUserId];

            const spectateSession = SpectateSession.from(socket, sessionToSpectate);

            // TODO: clean up spectator sessions here
        } else {
            const gameSession = GameSession.from(socket);

            gamingSessions[gameSession.userSession.id] = gameSession;
            socket.on('disconnect', () => { delete gamingSessions[gameSession.userSession.id]; })
        }
    });
};
