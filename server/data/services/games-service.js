'use strict';

const mongodb = require('mongodb');

const { hashing } = require('../../utils');

const serviceFunctions = ({ games }) => ({
    name: 'gamesService',
    save(game, userId) {
        console.log(game);
        if(game.persistentStorageId) {
            return games.findOneAndUpdate({ _id: mongodb.ObjectID(game.persistentStorageId) }, {
                field: game.field,
                updates: game.updates,
                details: game.details
            })
            .then(console.log);
        }
        console.log('FIELD', game.field);
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
        return games.find({ userId }).sort({ lastUpdatedOn: -1 }).limit(1).toArray();
    }
});

module.exports = serviceFunctions;
