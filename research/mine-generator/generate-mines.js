'use strict';


function* getMineGenerator(hexagonSize, minesCount) {
    if(minesCount >= hexagonSize) {
        throw new Error(`Mines count(${minesCount}) cannot be more than or equal to the number of cells`);
    }

    const mineProbabilityPerCell = minesCount / hexagonSize;
}

console.log(countCells(3));