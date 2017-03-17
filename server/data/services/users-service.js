'use strict';

const { hashing } = require('../../utils');

const serviceFunctions = ({ users }) => ({
    name: 'usersService',
    ranked(page, pageSize) {
        return users.find({}, { rating: 1, username: 1, achievementTitles: 1 })
            .sort({ rating: 1 })
            .skip(page * pageSize)
            .limit(pageSize)
            .toArray();
    },
    create(username, password, roles = ['standard'], rating = 0) {
        const passwordSalt = hashing.generateSalt(),
            passwordHash = hashing.hashPassword(passwordSalt, password);

        return users.findOne({ username }).then(foundUser => {
            if(foundUser) {
                throw new Error('Username taken');
            }

            return users.insert({
                username,
                passwordSalt,
                passwordHash,
                roles,
                rating
            }).then(({ ops }) => ops[0]);
        });

    },
    findById(_id) {
        return users.findOne({ _id });
    },
    findByUsername(username) {
        return users.findOne({ username });
    },
    findByCredentials(username, password) {
        return users
            .findOne({ username })
            .then(user => {
                if (user && this.passwordMatchesFor(user, password)) {
                    return user;
                }

                return null;
            });
    },
    passwordMatchesFor(user, password) {
        return user.passwordHash === hashing.hashPassword(user.passwordSalt, password);
    }
});

module.exports = serviceFunctions;
