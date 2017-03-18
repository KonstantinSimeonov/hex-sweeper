'use strict';

function countCells(hexagonSize) {
    const n = hexagonSize,
        result = (2 * (n - 1) * n) + (n - 2) * (n - 1) + 2 * n - 1;
    return result;
}

function* getMineGenerator(options, hexagonSize, minesCount) {
    let minesLeft = minesCount,
        emptyCellsLeft = countCells(hexagonSize);
    
    if(minesCount >= emptyCellsLeft) {
        throw new Error(`Mines count(${minesCount}) cannot be more than or equal to the number of cells`);
    }

    while(emptyCellsLeft >= 0) {
        const randChance = Math.random(),
            mineProbability = minesLeft / emptyCellsLeft;

        if(mineProbability > randChance) {
            yield options.getMine();
            minesLeft -= 1;
        } else {
            yield options.getEmpty();
        }

        emptyCellsLeft -= 1;
    }
}

module.exports = {
    countCells,
    getMineGenerator
};