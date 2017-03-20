'use strict';

// TODO: find out how to make the server modules importable with es6
export default function generateField(options, hexagonSize) {
    const matrixWidth = hexagonSize * 2 - (hexagonSize & 1),
        matrixHeight = hexagonSize * 2 - 1,
        matrix = [];

    let leftHexEnd = hexagonSize >> 1,
        rightHexEnd = hexagonSize + (hexagonSize >> 1) - 1;

    for (let row = 0; row < matrixHeight; row += 1) {
        if ((row & 1) ^ (row > (matrixHeight >> 1))) {
            leftHexEnd -= (row > (matrixHeight >> 1) ? -1 : 1);
            rightHexEnd += (row > (matrixHeight >> 1) ? -1 : 1);
        }

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