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
            const cellsCount = countCellsInHexagon(highscoreToCreate.fieldSize),
                minesCount = highscoreToCreate.minesCount,
                ranking = cellsCount * Math.pow(minesCount / (cellsCount - minesCount), 10) / highscoreToCreate.time;

            highscoreToCreate.ranking = ranking;

            if (nickname) {
                highscoreToCreate.nickname = nickname;
            }

            return highscores.insert(highscoreToCreate);
        },
        rankings(count) {
            return highscores.find({}).sort({ ranking: -1 }).limit(count).toArray();
        },
        rankingsByUserName(username){
            return highscores.find({ nickname: username }).sort({ ranking: -1 }).toArray();
        }
    };
};

module.exports = serviceFunctions;
