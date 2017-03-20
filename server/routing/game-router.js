'use strict';

module.exports = (server, { gamesController }) => {
    server.get('/api/difficulties', gamesController.getDifficulties);
};