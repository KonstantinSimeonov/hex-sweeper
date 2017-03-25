'use strict';

module.exports = (server, { gamesController }) => {
    server.get('/api/spectatable', gamesController.getSpectatable);
};