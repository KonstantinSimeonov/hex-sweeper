'use strict';

const mongodb = require('mongodb'),
    { countCellsInHexagon } = require('../../logic');

const serviceFunctions = ({ highscores }) => {
    highscores.ensureIndex({ ranking: -1 });

    return {
        name: 'highscoresService',
        updateNickname(gameTmpId, nickname) {
            return highscores.findOneAndUpdate({ gameTmpId }, { $set: { nickname } });
        },
        create(wonGame, nickname) {
            const highscoreToCreate = {
                gameTmpId: wonGame.gameId,
                time: (wonGame.lastUpdatedOn.getTime() - wonGame.createdOn.getTime()) / 1000, // could be wrong
                minesCount: wonGame.details.minesCount,
                fieldSize: wonGame.details.fieldSize
            };

            // TODO: ranking calculation logic should defo be changed
            const ranking = countCellsInHexagon(highscoreToCreate.fieldSize) / highscoreToCreate.minesCount / highscoreToCreate.time;

            highscoreToCreate.ranking = ranking;

            if (nickname) {
                highscoreToCreate.nickname = nickname;
            }

            return highscores.insert(highscoreToCreate);
        },
        rankings(count) {
            return highscores.find({}).sort({ ranking: -1 }).limit(count).toArray();
        },
        rankingsByUserId(userId){
            return highscores.find({ userId: mongodb.ObjectID(userId) }).sort({ ranking: -1 }).toArray();
        }
    };
};

module.exports = serviceFunctions;
