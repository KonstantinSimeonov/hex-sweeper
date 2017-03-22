'use strict';

const gameStorage = require('../sockets/game-storage');

module.exports = ({ dataServices: { highscoresService }, serverConfig }) => ({
    updateHighscoreNickname(req, res) {
        const { session } = req;
        console.log(session);
        highscoresService
            .updateNickname(session.gameId, req.body.nickname)
            .then(dbres => console.log(dbres) || res.json(dbres))
            .catch(dbres => console.log(dbres) || res.status(500).json(dbres));
    },
    rankings(req, res) {
        highscoresService.rankings(5)
            .then(highscores => res.status(200).json(highscores))
            .catch(err => console.log(err) || res.status(500).json(err));
    },
    highscoresByUserId(req, res) {
        highscoresService
            .rankingsByUserId(req.params.userId)
            .then(highscores => res.status(200).json(highscores))
            .catch(err => console.log(err) || res.status(500).json(err));
    }
});
