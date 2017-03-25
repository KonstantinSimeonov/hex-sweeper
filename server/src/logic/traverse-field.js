'use strict';

const dirs = [
    { dr: 0, dc: -1, off: 0 },
    { dr: 0, dc: 1, off: 0 },
    { dr: -1, dc: 0, off: 1 },
    { dr: -1, dc: 1, off: 1 },
    { dr: 1, dc: 0, off: 1 },
    { dr: 1, dc: 1, off: 1 },
];

let options;

function serializeCellUpdate(row, col, value) {
    return (row << 11) | (col << 4) | value;
}

function isInsideSquare(row, col, squareSize) {
    return (0 <= row && row < squareSize) && (0 <= col && col < squareSize);
}

function neighbors(row, col, size) {
    const offset = 1 - (row & 1);
    return dirs
        .map(({ dr, dc, off }) => ({ row: dr + row, col: dc + col - offset * off }))
        .filter(({ row, col }) => isInsideSquare(row, col, size));
}

function countAdjMines(neighboringCells, field) {
    return neighboringCells.reduce((minesCount, nextCell) => minesCount + (field[nextCell.row][nextCell.col] === options.mineCellToken), 0);
}

function revealCellAt(row, col, field, cb) {
    const nodes = [{ row, col }];

    while (nodes.length) {
        const current = nodes.pop();

        if (field[current.row][current.col] > 0 || (field[current.row][current.col] == null)) {
            continue;
        }

        const currentNodeNeighbors = neighbors(current.row, current.col, field.length),
            currentNodeAdjMinesCount = countAdjMines(currentNodeNeighbors, field);

        if (currentNodeAdjMinesCount) {
            field[current.row][current.col] = currentNodeAdjMinesCount;
        } else {
            field[current.row][current.col] = options.emptyCellToken;
            nodes.push(...currentNodeNeighbors.filter(x => field[x.row][x.col] !== options.emptyCellToken));
        }

        if (cb) {
            cb(current, field[current.row][current.col]);
        }
    }
}

module.exports = opts => {
    options = opts;
    return {
        isInsideSquare,
        neighbors,
        countAdjMines,
        revealCellAt,
        serializeCellUpdate
    };
};
