'use strict';

const { expect } = require('chai');

const O = '0',
    X = 'x';

const getGenerateField = require('../../src/logic/generate-field'),
    generateField = getGenerateField(({
        getCell() { return O; },
        getNullCell() { return X; }
    }));

describe('Field generator should generate hexagonal fields', () => {
    describe('Interface', () => {
        it('Should call provided getCell() once for each cell of the hexagon for size = 3', () => {
            let callCount = 0;

            getGenerateField({ getCell() { callCount += 1; }, getNullCell() {} })(3);

            expect(callCount).to.equal(3 * 2 + 4 * 2 + 5);
        });

        it('Should call provided getCell() once for each cell of the hexagon for size = 7', () => {
            let callCount = 0;

            getGenerateField({ getCell() { callCount += 1; }, getNullCell() {} })(7);

            expect(callCount).to.equal(7 * 2 + 8 * 2 + 9 * 2 + 10 * 2 + 11 * 2 + 12 * 2 + 13);
        });
    });

    describe('Algorithm correctness', () => {
        const testCases = [
            {
                size: 0,
                expected: []
            },
            {
                size: 1,
                expected: [[O]]
            },
            {
                size: 2,
                expected: [
                    [X, O, O, X],
                    [O, O, O],
                    [X, O, O, X]
                ]
            },
            {
                size: 3,
                expected: [
                    [X, O, O, O, X],
                    [O, O, O, O],
                    [O, O, O, O, O],
                    [O, O, O, O],
                    [X, O, O, O, X]
                ]
            },
            {
                size: 4,
                expected: [
                    [X, X, O, O, O, O, X, X],
                    [X, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, X],
                    [O, O, O, O, O, O, O],
                    [X, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, X],
                    [X, X, O, O, O, O, X, X],
                ]
            },
            {
                size: 5,
                expected: [
                    [X, X, O, O, O, O, O, X, X],
                    [X, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, X],
                    [O, O, O, O, O, O, O, O],
                    [O, O, O, O, O, O, O, O, O],
                    [O, O, O, O, O, O, O, O],
                    [X, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, X],
                    [X, X, O, O, O, O, O, X, X],
                ]
            },
            {
                size: 6,
                expected: [
                    [X, X, X, O, O, O, O, O, O, X, X, X],
                    [X, X, O, O, O, O, O, O, O, X, X],
                    [X, X, O, O, O, O, O, O, O, O, X, X],
                    [X, O, O, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, O, O, O, X],
                    [O, O, O, O, O, O, O, O, O, O, O],
                    [X, O, O, O, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, O, O, X],
                    [X, X, O, O, O, O, O, O, O, O, X, X],
                    [X, X, O, O, O, O, O, O, O, X, X],
                    [X, X, X, O, O, O, O, O, O, X, X, X],
                ]
            },
            {
                size: 7,
                expected: [
                    [X, X, X, O, O, O, O, O, O, O, X, X, X],
                    [X, X, O, O, O, O, O, O, O, O, X, X],
                    [X, X, O, O, O, O, O, O, O, O, O, X, X],
                    [X, O, O, O, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, O, O, O, O, X],
                    [O, O, O, O, O, O, O, O, O, O, O, O],
                    [O, O, O, O, O, O, O, O, O, O, O, O, O],
                    [O, O, O, O, O, O, O, O, O, O, O, O],
                    [X, O, O, O, O, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, O, O, O, X],
                    [X, X, O, O, O, O, O, O, O, O, O, X, X],
                    [X, X, O, O, O, O, O, O, O, O, X, X],
                    [X, X, X, O, O, O, O, O, O, O, X, X, X],
                ]
            },
            {
                size: 8,
                expected: [
                    [X, X, X, X, O, O, O, O, O, O, O, O, X, X, X, X],
                    [X, X, X, O, O, O, O, O, O, O, O, O, X, X, X],
                    [X, X, X, O, O, O, O, O, O, O, O, O, O, X, X, X],
                    [X, X, O, O, O, O, O, O, O, O, O, O, O, X, X],
                    [X, X, O, O, O, O, O, O, O, O, O, O, O, O, X, X],
                    [X, O, O, O, O, O, O, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, O, O, O, O, O, O, O, X],
                    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O],
                    [X, O, O, O, O, O, O, O, O, O, O, O, O, O, O, X],
                    [X, O, O, O, O, O, O, O, O, O, O, O, O, O, X],
                    [X, X, O, O, O, O, O, O, O, O, O, O, O, O, X, X],
                    [X, X, O, O, O, O, O, O, O, O, O, O, O, X, X],
                    [X, X, X, O, O, O, O, O, O, O, O, O, O, X, X, X],
                    [X, X, X, O, O, O, O, O, O, O, O, O, X, X, X],
                    [X, X, X, X, O, O, O, O, O, O, O, O, X, X, X, X]
                ]
            }
        ];

        testCases.forEach(function ({ size, expected }) {
            it(`Should work for size of ${size}`, () => {
                const expectedField = JSON.stringify(expected),
                    actualField = JSON.stringify(generateField(size));

                expect(actualField).to.equal(expectedField);
            });
        });
    });
});
