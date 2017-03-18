'use strict';

function rndInt(low, high) {
    return (Math.random() * (high - low) + low) | 0;
}

const modes = {
    low: 15,
    normal: 30,
    high: 50,
    pro: 75
};

function generateField(size, difficulty) {
    const minesCount = size * modes[difficulty.toLowerCase()] / 100 | 0,
        field = Array.from({ length: size }).map(() => {
            const mines = Array.from({ length: minesCount }).fill(-1),
                blanks = Array.from({ length: size - minesCount }).fill(0);

            return [...mines, ...blanks].sort(() => Math.random() - 0.5);
        });

    return field;
}

const dirs = [
    { dr: -2, dc: 0, off: 0 },
    { dr: -1, dc: 0, off: 1 },
    { dr: -1, dc: 1, off: 1 },
    { dr: 1, dc: 1, off: 1 },
    { dr: 1, dc: 0, off: 1 },
    { dr: 2, dc: 0, off: 0 }
];

function isInsideSquare(row, col, squareSize) {
    return (0 <= row && row < squareSize) && (0 <= col && col < squareSize);
}

function neighbors(x, y, size) {
    const offset = 1 - (y & 1);
    return dirs
            .map(({ dr, dc, off }) => ({ row: dr + y, col: dc + x - offset * off }))
            .filter(({ row, col }) => isInsideSquare(row, col, size));
}

// function play(x, y) {
//     const field = generateField(6, 'medium');
//     console.log(field);
//     console.log(neighbors(field, x, y));
// }

function color(n) {
    switch(n) {
        case -2:
        case 0: return 'lightblue';
        case -1: return 'gray';
        case 1: return 'green';
        case 2: return 'blue';
        default: return 'red';
    }
}

function drawField(field) {
    const elements = field.map((row, index) => {
        const lis = row.map((x, col) => `<li data-col="${col}" style="background: ${color(x)}">${x}</li>`).join('');
        const r = `<ul data-row="${index}">${lis}</ul>`;
        return r;
    });

    $('#mines').html(elements);
}

// console.log(neighbors(1, 1));

const field = generateField(8, 'normal');
console.log(field);
drawField(field);

$('#mines').on('click', ev => {
    const $target = $(ev.target),
        clickCol = +$target.attr('data-col'),
        clickRow = +$target.parent().attr('data-row');

    bfs(clickCol, clickRow, field);

    // const neighb = neighbors(clickCol, clickRow);

    // neighb.forEach(({ row, col }) => {
    //     const $rows = $('#mines').children('ul'),
    //         $targetRow = $rows.eq(row),
    //         $targetCell = $targetRow.children().eq(col);

    //     $targetCell.css({ background: 'red' });

    // });

    drawField(field);

    return false;
});

function countAdjMines(neighbs, field) {
    return neighbs.reduce((minesCount, nextCell) => minesCount + (field[nextCell.row][nextCell.col] === -1), 0);
}

function bfs(col, row, field, cb) {
    const nodes = neighbors(col, row, field.length);

    const adjMines = countAdjMines(nodes, field);
    console.log(`adj mines ${adjMines}`);
    if(field[row][col] === -1) {
        return;
    } else if(adjMines) {
        field[row][col] = adjMines;
        return;
    } else {
        field[row][col] = -2;
    }

    while (nodes.length) {
        const current = nodes.pop();

        console.log(current);

        if(field[current.row][current.col] > 0 || field[current.row][current.col] === -2) {
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