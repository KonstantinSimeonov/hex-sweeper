'use strict';

const gameStorage = require('../sockets/game-storage');

module.exports = ({ dataServices, serverConfig }) => ({
    getSpectatable(req, res) {
        const spectatables = gameStorage.getSpectatableGames();

        res.status(200).json(spectatables.map(sg => sg.gameId));
    }
});
