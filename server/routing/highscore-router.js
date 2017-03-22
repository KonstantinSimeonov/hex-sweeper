'use strict';

module.exports = (server, { highscoresController },  { authMiddleware }) => {
    server
        .put('/api/highscores', authMiddleware.decodeSession, highscoresController.updateHighscoreNickname)
        .get('/api/highscores', highscoresController.rankings);
};
