'use strict';

const gameStorage = require('../sockets/game-storage');

module.exports = ({ dataServices, serverConfig }) => ({
    getSpectatable(req, res) {
        res.status(200).json(gameStorage.spectatableGames.map(sg => sg.gameId));
    }
});
