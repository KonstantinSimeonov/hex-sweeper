'use strict';

const gameStorage = require('../sockets/games-storage');

module.exports = ({ dataServices, serverConfig }) => ({
    getSpectatable(req, res) {
        res.status(200).json(gameStorage.getSpectatableGames().map(sg => sg.tmpId));
    }
});