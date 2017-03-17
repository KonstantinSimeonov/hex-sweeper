'use strict';

module.exports = function (server, { authController, usersController }, { authMiddleware }) {
    server.get('/api/users', usersController.rankedUsers);
    server.post('/api/users', authController.register);
    server.post('/api/authenticate', authController.login);
}