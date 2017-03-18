'use strict';

const fieldFillerOptions = {
    getMine() {
        return -1;
    },
    getEmpty() {
        return 0;
    }
};

const { getFieldFiller } = require('./field-filler'),
    getFieldGenerator = require('./generate-field'),
    getTraversalLogic = require('./traverse-field'),
    { revealCellAt } = getTraversalLogic({ emptyCellToken: -2, mineCellToken: -1 });

module.exports = {
    createField(size, minesCount) {
        const fieldFiller = getFieldFiller(fieldFillerOptions, size, minesCount),
            generateField = getFieldGenerator({
                getNullCell() {
                    return null;
                },
                getCell() {
                    return fieldFiller.next().value;
                }
            });

        const field = generateField(size);

        return field;
    },
    revealCellAt
}
