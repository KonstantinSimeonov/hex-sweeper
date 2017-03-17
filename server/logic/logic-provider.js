'use strict';

const modes = {
    low: 15,
    normal: 30,
    high: 50,
    pro: 75
},
    dirs = [
        { dr: -2, dc: 0, off: 0 },
        { dr: -1, dc: 0, off: 1 },
        { dr: -1, dc: 1, off: 1 },
        { dr: 1, dc: 1, off: 1 },
        { dr: 1, dc: 0, off: 1 },
        { dr: 2, dc: 0, off: 0 }
    ];

function rndInt(low, high) {
    return (Math.random() * (high - low) + low) | 0;
}

function generateField(size, difficulty) {
    const minesCount = size * modes[difficulty.toLowerCase()] / 100 | 0,
        field = Array.from({ length: size }).map(() => {
            const mines = Array.from({ length: minesCount }).fill(-1),
                blanks = Array.from({ length: size - minesCount }).fill(0);

            return [...mines, ...blanks].sort(() => Math.random() - 0.5);
        });

    return field;
}

function isInsideSquare(row, col, squareSize) {
    return (0 <= row && row < squareSize) && (0 <= col && col < squareSize);
}

function neighbors(x, y, size) {
    const offset = 1 - (y & 1);
    return dirs
        .map(({ dr, dc, off }) => ({ row: dr + y, col: dc + x - offset * off }))
        .filter(({ row, col }) => isInsideSquare(row, col, size));
}

function countAdjMines(neighboringCells, field) {
    return neighboringCells.reduce((minesCount, nextCell) => minesCount + (field[nextCell.row][nextCell.col] === -1), 0);
}

function bfs(col, row, field, cb) {
    const nodes = neighbors(col, row, field.length),
        adjMines = countAdjMines(nodes, field);

    if (field[row][col] === -1) {
        return;
    } else if (adjMines) {
        field[row][col] = adjMines;
        return;
    } else {
        field[row][col] = -2;
    }

    while (nodes.length) {
        const current = nodes.pop();

        if (field[current.row][current.col] > 0 || field[current.row][current.col] === -2) {
            continue;
        }

        const currentNodeNeighbors = neighbors(current.col, current.row, field.length),
            currentNodeAdjMinesCount = countAdjMines(currentNodeNeighbors, field);

        if (currentNodeAdjMinesCount) {
            field[current.row][current.col] = currentNodeAdjMinesCount;
        } else {
            field[current.row][current.col] = -2;
            nodes.push(...currentNodeNeighbors);
        }
    }
}

module.exports = {
    rndInt,
    generateField,
    isInsideSquare,
    neighbors,
    countAdjMines,
    bfs
}