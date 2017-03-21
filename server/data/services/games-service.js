'use strict';

const mongodb = require('mongodb');

const { hashing } = require('../../utils');

const serviceFunctions = ({ games }) => ({
    name: 'gamesService',
    save(game, userId) {
        console.log(game);
        return games.insert({
            field: game.field,
            updates: game.updates,
            details: game.details,
            userId: userId
        })
        .then(({ ops }) => ops[0])
        .then(console.log);
    },
    recoverLast(userId) {
        return games.find({ userId }).sort({ lastUpdatedOn: -1 }).limit(1).toArray();
    }
});

module.exports = serviceFunctions;
