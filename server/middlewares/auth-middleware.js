'use strict';

const jwt = require('jsonwebtoken');

module.exports = ({ dataServices: { usersService }, serverConfig }) => ({
    decodeSession(req, res, next) {
        const authToken = req.query.token || req.body.token || req.headers['x-access-token'];
        if(!authToken) {
            next();
        }

        jwt.verify(authToken, serverConfig.secret, (err, session) => {
            if(err) {
                return res.send(400, { success: false, message: 'Authentication failed' });
            }


            req.session = session;
            next();
        });
    },
    attachUser(req, res, next) {
        usersService
            .findById(req.session.id)
            .then(user => {
                req.session.user = user;
                next();
            })
            .catch(err => console.log(err) || res.send(500, err));
    },
    /**
     * @param {string} role
     * @returns Function
     */
    hasRole(role) {
        return function (req, res, next) {
            if(!req.session || !req.session.user || req.session.user.roles.indexOf(role) === -1) {
                return res.send(403, { success: false, message: 'You are not authorized for this action' });
            } 

            next();
        }
    }
});
