'use strict';

const jwt = require('jsonwebtoken');

module.exports = ({ dataServices: { usersService }, serverConfig }) => ({
    register(req, res) {
        const { username, password } = req.body.user;

        usersService
            .create(username, password)
            .then(user => {
                delete user.passwordHash;
                delete user.passwordSalt;
                res.status(201).json(user);
            })
            .catch(error => console.log(error.message) || res.status(500).json({ success: false, message: error.message }));
    },
    login(req, res) {
        const { username, password } = req.body.user;

        usersService
            .findByCredentials(username, password)
            .then(user => {
                console.log('hits promise');
                if (!user) {
                    return res.status(200).json({ success: false, message: 'Invalid username or password' });
                }

                const payload = { username: user.username, id: user._id },
                    token = jwt.sign(payload, serverConfig.secret, { expiresIn: 1440 })
                res.status(200).json({
                    success: true,
                    token
                });
            })
            .catch(err => console.log(err) || res.send(500, err));
    }
});