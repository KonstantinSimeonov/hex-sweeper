'use strict';

const { expect } = require('chai');

const { createField } = require('../../src/logic');

describe('Logic modules should generate correct game fields when used together', () => {
    describe('Field size should be correct', () => {
        const testCases = [
            { size: 2, expected: 7 },
            { size: 3, expected: 19 },
            { size: 4, expected: 37 },
            { size: 5, expected: 61 },
        ];

        for(const { size, expected } of testCases) {
            it(`Should generate correct number of cells for ${size}`, () => {
                const field = createField(size, size + 2);

                const cellsCount = field.map(row => row.filter(x => x !== null).length).reduce((sum, next) => sum + next, 0);

                expect(cellsCount).to.equal(expected);
            });
        }
    });

    describe('Field must contain the specified mines count', () => {
        const testCases = [
            { size: 2, minesCount: 5 },
            { size: 3, minesCount: 11 },
            { size: 4, minesCount: 2 },
            { size: 4, minesCount: 30 },
            { size: 5, minesCount: 60 },
            { size: 5, minesCount: 10 },
            { size: 10, minesCount: 100 },
            { size: 50, minesCount: 500 }
        ];

        for(const { size, minesCount } of testCases) {
            it(`Should generate field with ${minesCount} mines on it`, () => {
                const field = createField(size, minesCount);

                const fieldMinesCount = field.map(row => row.filter(x => x === -1).length).reduce((sum, next) => sum + next, 0);

                expect(fieldMinesCount).to.equal(minesCount);
            });
        }
    });
});
