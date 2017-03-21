'use strict';

const rawStorage = {
    gamesMap: Object.create(null)
};

// TODO: do some garbage collection
module.exports = {
    storeGame(userId, field, details) {
        details.minesLeft = details.minesCount;
        console.log(details.minesLeft);
        rawStorage.gamesMap[userId] = {
            field,
            details,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            updates: []
        };
    },
    getGame(userId) {
        return rawStorage.gamesMap[userId];
    },
    update(userId, updates) {
        const gameToUpdate = rawStorage.gamesMap[userId];
        gameToUpdate.details.minesLeft -= updates.length;
        gameToUpdate.updates.push(...updates);
        gameToUpdate.lastUpdatedOn = new Date();
    },
    cleanAllBefore(date) {
        for(const userId of rawStorage.gamesMap) {
            if(rawStorage.gamesMap[userId].lastUpdatedOn < date) {
                delete rawStorage.gamesMap[userId];
            }
        }
    }
};
