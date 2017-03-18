'use strict';

function generateField(options, hexagonSize = options, minesCount) {
    let matrixWidth = hexagonSize * 2 - (hexagonSize & 1),
        matrixHeight = hexagonSize * 2 - 1,
        leftHexEnd = hexagonSize >> 1,
        rightHexEnd = hexagonSize + (hexagonSize >> 1) - 1,
        matrix = [];

    for (let row = 0; row < matrixHeight; row += 1) {
        if ((row & 1) ^ (row > (matrixHeight >> 1))) {
            leftHexEnd -= (row > (matrixHeight >> 1) ? -1 : 1);
            rightHexEnd += (row > (matrixHeight >> 1) ? -1 : 1);            
        }

        // console.log(`row: ${row}, rhe: ${rightHexEnd}`);

        matrix[row] = [];

        for (let col = 0; col < (matrixWidth - (row & 1)); col += 1) {
            if (leftHexEnd <= col && col <= rightHexEnd - (row & 1)) {
                matrix[row][col] = options.getCell();
            } else {
                matrix[row][col] = options.getNullCell();
            }
        }
    }

    return matrix;
}

console.log(generateField({
    getCell: () => 0,
    getNullCell: () => null
}, 8));

console.log(generateField({
    getCell: () => 0,
    getNullCell: () => null
}, 7));

module.exports = options => generateField.bind(null, options);