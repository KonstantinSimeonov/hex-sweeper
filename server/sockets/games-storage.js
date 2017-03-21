'use strict';

const uuid = require('node-uuid');

const rawStorage = {
    gamesMap: Object.create(null),
    spectatableGames: [],
    gamesById: Object.create(null)
};

// TODO: do some garbage collection
module.exports = {
    storeGame(userId, field, details) {
        details.minesLeft = details.minesCount;
        const gameToStore = {
            field,
            details,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            updates: [],
            tmpId: uuid.v1()
        };

        rawStorage.gamesById[gameToStore.tmpId] = gameToStore;
        rawStorage.gamesMap[userId] = gameToStore;
        rawStorage.spectatableGames.push(gameToStore);
    },
    getGame(userId) {
        return rawStorage.gamesMap[userId];
    },
    getGameByTmpId(tmpId) {
        return rawStorage.gamesById[tmpId];
    },
    update(userId, updates) {
        // console.log(updates);
        const gameToUpdate = rawStorage.gamesMap[userId];
        gameToUpdate.details.minesLeft -= updates.length;
        gameToUpdate.updates.push(...updates);
        gameToUpdate.lastUpdatedOn = new Date();
    },
    cleanAllBefore(date) {
        for (const userId of rawStorage.gamesMap) {
            if (rawStorage.gamesMap[userId].lastUpdatedOn < date) {
                delete rawStorage.gamesMap[userId];
            }
        }
    },
    getSpectatableGames() {
        return rawStorage.spectatableGames;
    }
};
