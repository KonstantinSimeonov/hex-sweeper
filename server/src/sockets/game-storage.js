'use strict';

const defaultTimeProvider = { get now() { return new Date(); } };

let currentTimeProvider = defaultTimeProvider;

class InMemoryGameStorage {
    static createInstance(...args) {
        return new InMemoryGameStorage(...args);
    }

    constructor(cleanUpAfterSeconds = 60, cleanUpInterval = 30) {
        this._gamesByUserId = Object.create(null);
        this._gamesByOwnId = Object.create(null);
        this._spectatableGames = [];

        this.cleanUpAfterSeconds = cleanUpAfterSeconds;
        this.cleanUpInterval = cleanUpInterval;
    }

    /** Date time provider for testability - new Date() is hard to test */
    get defaultTimeProvider() { return defaultTimeProvider; }
    use(timeProvider) { currentTimeProvider = timeProvider; }


    get spectatableGames() {
        return this._spectatableGames;
    }

    storeGame(userId, gameId, field, details) {
        details.minesLeft = details.minesCount;
        const gameToStore = {
            field,
            details,
            gameId,
            createdOn: currentTimeProvider.now,
            lastUpdatedOn: currentTimeProvider.now,
            updates: [],
        };

        this._gamesByOwnId[gameId] = gameToStore;
        this._gamesByUserId[userId] = gameToStore;

        if (details.spectatable) {
            this._spectatableGames.push(gameToStore);
            // store index in game for faster GC when inactive
            gameToStore.spectatableIndex = this._spectatableGames.length - 1;
        }
    }

    getGameByUserId(userId) {
        return this._gamesByUserId[userId];
    }

    getGameByGameId(gameId) {
        return this._gamesByOwnId[gameId];
    }

    linkGameToPersintentStorageById(gameId, persistentStorageId) {
        this._gamesByOwnId[gameId].persistentStorageId = persistentStorageId;
    }

    deactivateGameById(gameId) {
        const gameToDeactivate = this.getGameByGameId(this.gameId);

        if (gameToDeactivate) {
            game.details.active = false;
        }
    }

    /**
     * Push serialized field updates to the storage. Uses user id to find the appropriate game.
     */
    update(userId, updates) {
        const gameToUpdate = this._gamesByUserId[userId];

        gameToUpdate.details.freeCells -= updates.length;
        gameToUpdate.updates.push(...updates);
        gameToUpdate.lastUpdatedOn = currentTimeProvider.now;
    }

    cleanAllBefore(date) {
        const lastUpdatedAllowedMargin = new Date(currentTimeProvider.now.getTime() - CLEAN_UP_AFTER_SECONDS * 1000);

        for (const userId in this._gamesByUserId) {
            const game = this._gamesByUserId[userId];

            /** if game inactive and last update was too long ago */
            if (!game.details.active && game.lastUpdatedOn < lastUpdatedAllowedMargin) {
                console.log(`GC game ${game.gameId}`);
                if (game.details.spectatable) {
                    /** gc from spectatable collection by index kept in game record */
                    const lastSpectatable = this._spectatableGames[this._spectatableGames.length - 1];

                    lastSpectatable.spectatableIndex = game.spectatableIndex;
                    this._spectatableGames[game.spectatableIndex] = lastSpectatable;
                    this._spectatableGames.pop();
                }

                delete this._gamesByOwnId[game.gameId];
                delete this._gamesByUserId[userId];
            }
        }
    }
}

module.exports = {
    instance: InMemoryGameStorage.createInstance(),
    createInstance: InMemoryGameStorage.createInstance
};
