'use strict';

const { expect } = require('chai');

const { countCellsInHexagon, getFieldFiller } = require('../../logic/field-filler');

const mineGeneratorOptions = {
    getMine() { return 1; },
    getEmpty() { return 0; }
};

describe('Mine generating utilities', () => {
    describe('Cell counting', () => {
        const testCases = [
            { size: 2, expected: 7 },
            { size: 3, expected: 19 },
            { size: 4, expected: 37 },
            { size: 5, expected: 61 },
            { size: 10, expected: 271 }
        ];

        testCases.forEach(function ({ size, expected }) {
            it(`Should count cells correctly for size of ${size}`, () => {
                expect(countCellsInHexagon(size)).to.equal(expected);
            });
        });
    });

    describe('Random mine distributor', () => {
        describe('Should generate exact amount of mines', () => {
            const testCases = [2, 3, 4, 10, 15, 20, 40].map(size => [size, countCellsInHexagon(size)]);

            testCases.forEach(function ([size, cellsCount]) {

                for (let i = 0; i < cellsCount; i += cellsCount / size | 0) {
                    it(`Should generate exactly ${i} number of mines in ${size} field when called with those parameters`, () => {
                        const mineGen = getFieldFiller(mineGeneratorOptions, size, i);

                        let generatedMinesCount = 0;

                        for (const cell of mineGen) {
                            generatedMinesCount += cell;
                        }

                        expect(generatedMinesCount).to.equal(i);
                    });
                }
            });
        });

        describe('Should mostly generate different permutations o`f the same mine count in the same field', () => {
            const testCases = [[2, 3], [4, 6], [4, 10], [10, 5], [5, 60]],
                repeats = 10,
                minDistinct = 7;

            testCases.forEach(function ([size, minesCount]) {
                it(`Should not generate more than ${repeats - minDistinct} equal field permutations for size ${size} and mines count ${minesCount}`, () => {
                    const permutations = Object.create(null);

                    for (let i = 0; i < repeats; i += 1) {
                        const mineGen = getFieldFiller(mineGeneratorOptions, size, minesCount);

                        let fieldPermutation = '';

                        for (const mine of mineGen) {
                            fieldPermutation += mine;
                        }

                        permutations[fieldPermutation] = true;
                    }

                    expect(Object.keys(permutations).length < minDistinct).to.be.false;
                });
            });
        });

        describe('Invalid input', () => {
            describe('Should throw when mines count >= cell count in the field', () => {
                const testCases = [[2, 7], [2, 8], [3, 19], [3, 20], [3, 55], [10, 100000]];
                
                for(const test of testCases) {
                    const [size, minesCount] = test;
                    const fn = () => getFieldFiller(mineGeneratorOptions, size, minesCount).next();
                    it(`Should throw for size ${size} and mines count ${minesCount}`, () => {
                        expect(fn).to.throw();
                    })
                }
            });
        });
    });
});
