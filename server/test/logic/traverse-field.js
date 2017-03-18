'use strict';

const { expect } = require('chai');


const X = null, O = 0, M = -1;

const { revealCellAt, isInsideSquare, countAdjMines, neighbors } = require('../../logic/traverse-field')({
    get mineCellToken() { return M },
    get emptyCellToken() { return -2 }
});

const json = JSON.stringify.bind(JSON);

describe('Field traversing and mutating', () => {
    describe('neighbors', () => {

    });

    describe('Cell revealing', () => {
        it('Empty field with one mone should reveal all except mine and those around it', () => {
            const testField = [
                    [X, O, O, O, X],
                    [O, O, O, O],
                    [O, O, M, O, O],
                    [O, O, O, O],
                    [X, O, O, O, X]
                ],
                expected = [
                    [X, -2, -2, -2, X],
                     [-2, 1, 1, -2],
                    [-2, 1, M, 1, -2],
                     [-2, 1, 1, -2],
                    [X, -2, -2, -2, X]
                ];

            revealCellAt(1, 0, testField);

            expect(json(testField)).to.equal(json(expected));
        });

        it('Should reveal only target cell when next to mine', () => {
            const testField = [
                    [X, O, O, O, X],
                    [O, O, O, O],
                    [O, O, M, O, O],
                    [O, O, O, O],
                    [X, O, O, O, X]
                ],
                expected = [
                    [X, O, O, O, X],
                     [O, 1, O, O],
                    [O, O, M, O, O],
                     [O, O, O, O],
                    [X, O, O, O, X]
                ];

            revealCellAt(1, 1, testField);

            expect(json(testField)).to.equal(json(expected));
        });

        const testCases = [
            {
                beforeReveal: [
                    [X, M, O, X],
                    [O, O, O],
                    [X, M, O, X]
                ],
                afterReveal: [
                    [X, M, 1, X],
                    [O, 2, -2],
                    [X, M, 1, X]
                ],
                revealCoords: { row: 1, col: 2 }
            },
            {
                beforeReveal: [
                    [X, M, M, X],
                    [M, M, O],
                    [X, M, M, X]
                ],
                afterReveal: [
                    [X, M, M, X],
                    [M, M, 3],
                    [X, M, M, X]
                ],
                revealCoords: { row: 1, col: 2 }
            },
            {
                beforeReveal: [
                    [X, O, O, X],
                    [O, O, O],
                    [X, M, O, X]
                ],
                afterReveal: [
                    [X, -2, -2, X],
                    [1, 1, -2],
                    [X, M, 1, X]
                ],
                revealCoords: { row: 0, col: 2 }
            },
            {
                beforeReveal: [
                    [X, M, M, X],
                    [O, O, M],
                    [X, M, M, X]
                ],
                afterReveal: [
                    [X, M, M, X],
                    [O, 5, M],
                    [X, M, M, X]
                ],
                revealCoords: { row: 1, col: 1 }
            },
            {
                beforeReveal: [
                    [X, O, O, O, X],
                    [O, O, O, O],
                    [O, M, O, O, O],
                    [O, M, O, O],
                    [X, O, O, O, X]
                ],
                afterReveal: [
                    [X, -2, -2, -2, X],
                      [1, 1, -2, -2],
                    [O, M, 2, -2, -2],
                      [O, M, 1, -2],
                    [X, O, 1, -2, X]
                ],
                revealCoords: { row: 0, col: 1 }
            },
            {
                beforeReveal: [
                    [X, O, O, O, X],
                     [M, O, O, O],
                    [O, M, O, O, O],
                     [O, M, O, O],
                    [X, O, O, M, X]
                ],
                afterReveal: [
                    [X, 1, -2, -2, X],
                     [M, 2, -2, -2],
                    [O, M, 2, -2, -2],
                     [O, M, 2, 1],
                    [X, O, O, M, X]
                ],
                revealCoords: { row: 2, col: 4 }
            },
            {
                beforeReveal: [
                    [X, O, O, O, X],
                     [M, O, O, O],
                    [O, M, O, O, O],
                     [O, M, O, O],
                    [X, O, O, M, X]
                ],
                afterReveal: [
                    [X, 1, -2, -2, X],
                     [M, 2, -2, -2],
                    [O, M, 2, -2, -2],
                     [O, M, 2, 1],
                    [X, O, O, M, X]
                ],
                revealCoords: { row: 0, col: 2 }
            },
            {
                beforeReveal: [
                    [X, M, O, O, X],
                     [M, O, M, M],
                    [O, O, O, O, M],
                     [O, O, O, M],
                    [X, O, O, O, X]
                ],
                afterReveal: [
                    [X, M, O, O, X],
                     [M, O, M, M],
                    [O, O, O, 4, M],
                     [O, O, O, M],
                    [X, O, O, O, X]
                ],
                revealCoords: { row: 2, col: 3 }
            }
        ];

        testCases.forEach(function (test) {
            it(`Should work`, () => {
                const { beforeReveal, afterReveal, revealCoords: { row, col } } = test;

                revealCellAt(row, col, beforeReveal);

                expect(json(beforeReveal)).to.equal(json(afterReveal));
            });
        });
    });
});
