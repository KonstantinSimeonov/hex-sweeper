'use strict';

const { expect } = require('chai'),
    uuid = require('uuid');

const createMemoryStorageInstance = require('../src/sockets/class-game-storage').createInstance;

const json = JSON.stringify.bind(JSON);
let storage;

beforeEach(() => storage = createMemoryStorageInstance());

describe('in-memory game storage tests', () => {
    describe('Adding and accessing games', () => {
        it('Stored games should be retrievable via the user id', () => {
            const gameId = uuid.v1(),
                userId = uuid.v1(),
                field = [[0, 1], [1, 1], [0, 1]],
                details = { minesCount: 2 };

            storage.storeGame(userId, gameId, field, details);

            const gameFromStorage = storage.getGameByUserId(userId);

            expect(gameFromStorage.gameId).to.equal(gameId);
            expect(json(gameFromStorage.field)).to.equal(json(field));
        });

        it('Stored games should be retrievable via game id', () => {
            const gameId = uuid.v1(),
                userId = uuid.v1(),
                field = [[0, 1], [1, 1], [0, 1]],
                details = { minesCount: 3 };

            storage.storeGame(userId, gameId, field, details);

            const gameFromStorage = storage.getGameByGameId(gameId);

            expect(json(gameFromStorage.field)).to.equal(json(field));
        });

        it('Games that have the field "spectatable" in details set to "true" should be accessible by calling getSpectatableGames()', () => {
            const gameIds = [];

            for (let i = 0; i < 4; i += 1) {
                const gameId = uuid.v1(),
                    userId = uuid.v1();

                if (!(i % 2)) {
                    gameIds.push({ gameId, userId });
                }

                storage.storeGame(userId, gameId, [[0, 1], [1, 1], [0, 1]], {
                    minesCount: 1,
                    spectatable: !(i % 2)
                });
            }

            const spectatable = storage.spectatableGames;

            for (const gid of gameIds) {
                const game = spectatable.find(x => x.gameId === gid.gameId);
                expect(Array.isArray(game.field)).to.be.true;
                expect(game.createdOn instanceof Date).to.be.true;
            }
        });

        it('Games that do NOT have the "spectatable" field set to true should not be accessible through the spectatable games array', () => {
            const someRandomField = [[0, 1, 1, 0], [1, 1, 1], [0, 1, 1]];

            for (let i = 0; i < 4; i += 1) {
                const userId = uuid.v1(),
                    gameId = uuid.v1();

                storage.storeGame(userId, gameId, someRandomField, {
                    minesCount: 1,
                    spectatable: false
                });
            }

            expect(storage.spectatableGames.length).to.equal(0);
        });
    });

    describe('Updating games', () => {
        it('Updating game via user id should add the updates to the game`s updates array', () => {
            const someRandomField = [[0, 1, 1, 0], [1, 1, 1], [0, 1, 1]],
                gameId = uuid.v1(),
                userId = uuid.v1(),
                details = { minesCount: 7 };

            storage.storeGame(userId, gameId, someRandomField, details);

            const updates = [1, 2, 23];

            storage.update(userId, updates);

            const gameFromStorage = storage.getGameByGameId(gameId);

            expect(json(gameFromStorage.updates)).to.equal(json(updates))
        });

        it('Updating game via user id should change the lastUpdatedOn property', () => {
            const someRandomField = [[0, 1, 1, 0], [1, 1, 1], [0, 1, 1]],
                gameId = uuid.v1(),
                userId = uuid.v1(),
                details = { minesCount: 7 };

            const mockTimeProvider = { get now() { return new Date('11/11/2011'); } };

            storage.use(mockTimeProvider);
            storage.storeGame(userId, gameId, someRandomField, details);

            const updates = [1, 2, 23];

            storage.update(userId, updates);

            const gameFromStorage = storage.getGameByGameId(gameId);

            expect(gameFromStorage.lastUpdatedOn.getTime()).to.equal(mockTimeProvider.now.getTime());
        });

        it('Updating game via user id should update the free cells count correctly', () => {
            const someRandomField = [[0, 1, 1, 0], [1, 1, 1], [0, 1, 1]],
                gameId = uuid.v1(),
                userId = uuid.v1(),
                details = { minesCount: 7, freeCells: 5 },
                updates = [1, 2, 3];

            storage.storeGame(userId, gameId, someRandomField, details);

            storage.update(userId, updates);

            const gameFromStorage = storage.getGameByGameId(gameId);

            expect(gameFromStorage.details.freeCells).to.equal(5 - updates.length);
        });
    });
});