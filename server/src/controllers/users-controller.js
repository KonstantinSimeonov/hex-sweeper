'use strict';

module.exports = ({ dataServices: { usersService }, serverConfig }) => ({
    rankedUsers(req, res) {
        const { page = 0, pageSize = 10 } = req.query;

        usersService
            .ranked(page, pageSize)
            .then(users => res.send(200, users))
            .catch(error => res.send(500, error));
    },
    profile(req, res) {
        const { username } = req.params;

        usersService
            .findByUsername(username)
            .then(user => res.send(200, user));
    }
});
