'use strict';

const mongodb = require('mongodb');

const { hashing } = require('../../utils');

const serviceFunctions = ({ games }) => ({
    name: 'gamesService',
    save(game, userId) {
        if(game.persistentStorageId) {
            return games.findOneAndUpdate({ _id: mongodb.ObjectID(game.persistentStorageId) }, {
                field: game.field,
                updates: game.updates,
                details: game.details
            });
        }

        return games.insert({
            field: game.field,
            updates: game.updates,
            details: game.details,
            userId: userId,
            tmpId: game.gameId
        })
        .then(({ ops }) => ops[0]);
    },
    recoverLast(userId) {
        return games.find({ userId, finished: false }).sort({ lastUpdatedOn: -1 }).limit(1).toArray();
    },
    markAsFinished(persistentStorageId) {
        return games.findOneAndUpdate({ _id: mongodb.ObjectID(persistentStorageId) }, { finished: true });
    }
});

module.exports = serviceFunctions;
