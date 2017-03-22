'use strict';

/* in-memory storage */

const rawStorage = {
    gamesMap: Object.create(null),
    spectatableGames: [],
    gamesById: Object.create(null)
};

// TODO: do some garbage collection
const inMemoryGameStorage = {

   /**
    * Store game objects by user id and game id.
    */
    storeGame(userId, gameId, field, details) {
        details.minesLeft = details.minesCount;
        const gameToStore = {
            field,
            details,
            gameId,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            updates: [],
        };

        rawStorage.gamesById[gameId] = gameToStore;
        rawStorage.gamesMap[userId] = gameToStore;
        if(details.spectatable) {
            rawStorage.spectatableGames.push(gameToStore);
            gameToStore.spectatableIndex = rawStorage.spectatableGames.length - 1;
        }
    },
    getGameByUserId(userId) {
        return rawStorage.gamesMap[userId];
    },
    getGameByGameId(gameId) {
        return rawStorage.gamesById[gameId];
    },
    /**
     * Push serialized field updates to the storage. Uses user id to find the appropriate game.
     */
    update(userId, updates) {
        const gameToUpdate = rawStorage.gamesMap[userId];

        gameToUpdate.details.freeCells -= updates.length;
        gameToUpdate.updates.push(...updates);
        gameToUpdate.lastUpdatedOn = new Date();
    },
    /**
     * Supposed to do garbage collection. Someone should write tests before letting that spin on setInterval thou.
     */
    cleanAllBefore(date) {
        const nao = new Date(Date.now() - 20 * 1000);
        for (const userId in rawStorage.gamesMap) {
            const game = rawStorage.gamesMap[userId];
            console.log('ZDR GOSHO', game.lastUpdatedOn < nao, game.details.active);
            if (!game.details.active && game.lastUpdatedOn < nao) {
                if(game.details.spectatable) {
                    const lastSpectatable = rawStorage.spectatableGames.slice(-1)[0];

                    lastSpectatable.spectatableIndex = game.spectatableIndex;
                    rawStorage.spectatableGames[game.spectatableIndex] = lastSpectatable;
                    rawStorage.spectatableGames.pop();
                }

                delete rawStorage.gamesMap[userId];
            }
        }
    },
    getSpectatableGames() {
        return rawStorage.spectatableGames;
    }
};

setInterval(() => inMemoryGameStorage.cleanAllBefore(new Date()), 20 * 1000);

module.exports = inMemoryGameStorage;
