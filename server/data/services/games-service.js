'use strict';

const mongodb = require('mongodb');

const { hashing } = require('../../utils');

const serviceFunctions = ({ games }) => ({
    name: 'gamesService',
    save(game, startedOn, userId) {
        console.log('ok');
        return games.insert({
            game,
            startedOn,
            userId
        })
        .then(({ ops }) => ops[0]);
    },
    recover(gameId) {
        return games.findOne({ _id: mongodb.ObjectID(gameId) });
    }
});

module.exports = serviceFunctions;
