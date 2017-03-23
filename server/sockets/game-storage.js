'use strict';

/* in-memory storage */

/** Clean all games older than 60 seconds that are inactive */
const CLEAN_UP_AFTER_SECONDS = 60,
    /** Try to clean games every 30 seconds */
    CLEAN_UP_SECONDS_INTERVAL = 30;

/** private stuff */
const rawStorage = {
    gamesByUserId: Object.create(null),
    spectatableGames: [],
    gamesByOwnId: Object.create(null)
}, defaultTimeProvider = { get now() { return new Date(); } },
    currentTimeProvider = defaultTimeProvider;

// TODO: do some garbage collection
const inMemoryGameStorage = {
    /** Date time provider for testability - new Date() is hard to test */
    get defaultTimeProvider() { return defaultTimeProvider; },
    use(timeProvider) { currentTimeProvider = timeProvider; },

    /**
     * Store game objects by user id and game id.
     */
    storeGame(userId, gameId, field, details) {
        console.log(field);
        details.minesLeft = details.minesCount;
        const gameToStore = {
            field,
            details,
            gameId,
            createdOn: currentTimeProvider.now,
            lastUpdatedOn: currentTimeProvider.now,
            updates: [],
        };

        rawStorage.gamesByOwnId[gameId] = gameToStore;
        rawStorage.gamesByUserId[userId] = gameToStore;

        if (details.spectatable) {
            rawStorage.spectatableGames.push(gameToStore);
            // store index in game for faster GC when inactive
            gameToStore.spectatableIndex = rawStorage.spectatableGames.length - 1;
        }
    },
    getGameByUserId(userId) {
        return rawStorage.gamesByUserId[userId];
    },
    getGameByGameId(gameId) {
        return rawStorage.gamesByOwnId[gameId];
    },
    linkGameToPersintentStorageById(gameId, persistentStorageId) {
        rawStorage.gamesByOwnId[gameId].persistentStorageId = persistentStorageId;
    },
    deactivateGameById(gameId) {
        const gameToDeactivate = this.getGameByGameId(this.gameId);

        if(gameToDeactivate) {
            game.details.active = false;
        }
    },
    /**
     * Push serialized field updates to the storage. Uses user id to find the appropriate game.
     */
    update(userId, updates) {
        const gameToUpdate = rawStorage.gamesByUserId[userId];

        gameToUpdate.details.freeCells -= updates.length;
        gameToUpdate.updates.push(...updates);
        gameToUpdate.lastUpdatedOn = currentTimeProvider.now;
    },
    /**
     * Supposed to do garbage collection. Someone should write tests before letting that spin on setInterval thou.
     */
    cleanAllBefore(date) {
        const lastUpdatedAllowedMargin = new Date(currentTimeProvider.now.getTime() - CLEAN_UP_AFTER_SECONDS * 1000);

        for (const userId in rawStorage.gamesByUserId) {
            const game = rawStorage.gamesByUserId[userId];

            /** if game inactive and last update was too long ago */
            if (!game.details.active && game.lastUpdatedOn < lastUpdatedAllowedMargin) {
                console.log(`GC game ${game.gameId}`);
                if (game.details.spectatable) {
                    /** gc from spectatable collection by index kept in game record */
                    const lastSpectatable = rawStorage.spectatableGames[rawStorage.spectatableGames.length - 1];

                    lastSpectatable.spectatableIndex = game.spectatableIndex;
                    rawStorage.spectatableGames[game.spectatableIndex] = lastSpectatable;
                    rawStorage.spectatableGames.pop();
                }

                delete rawStorage.gamesByOwnId[game.gameId];
                delete rawStorage.gamesByUserId[userId];
            }
        }
    },
    get spectatableGames() {
        return rawStorage.spectatableGames;
    }
};

setInterval(() => inMemoryGameStorage.cleanAllBefore(currentTimeProvider.now), CLEAN_UP_SECONDS_INTERVAL * 1000);

module.exports = inMemoryGameStorage;
