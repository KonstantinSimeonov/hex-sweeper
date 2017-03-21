'use strict';

const rawStorage = {
    gamesMap: Object.create(null)
};

// TODO: do some garbage collection
module.exports = {
    storeGame(userId, field, spectatable) {
        rawStorage.gamesMap[userId] = {
            field,
            spectatable,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            updates: []
        };
    },
    getGame(userId) {
        return rawStorage.gamesMap[userId];
    },
    update(userId, updates) {
        rawStorage.gamesMap[userId].updates.push(...updates);
        rawStorage.gamesMap[userId].lastUpdatedOn = new Date();
        return this;
    },
    cleanAllBefore(date) {
        for(const userId of rawStorage.gamesMap) {
            if(rawStorage.gamesMap[userId].lastUpdatedOn < date) {
                delete rawStorage.gamesMap[userId];
            }
        }
    }
};
