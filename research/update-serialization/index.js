'use strict';

const rowMask = (1 << 17) - 1,
    colMask = (1 << 10) - 1,
    valueMask = (1 << 4) - 1;

function bin(n) {
    let res = '';

    do {
        res = (n & 1) + res;
        n >>>= 1;
    } while(n !== 0);

    return res;
}

function padLeft(str, amount) {
    return Array.from({ length: amount + 1 }).join(' ') + str;
}

function serializeCellUpdate(row, col, value) {
    return (row << 11) | (col << 4) | value;
}

function deserializeCellUpdate(cellUpdate) {
    return [(cellUpdate & rowMask) >> 11, (cellUpdate & colMask) >> 4, cellUpdate & valueMask];
}

const test = serializeCellUpdate(17, 35, 3);
console.log(bin(test));
console.log(test);

console.log(deserializeCellUpdate(test));

console.log(deserializeCellUpdate(serializeCellUpdate(32, 1, 7)));

// 20

r - rrrrrr
c - cccccc
v - vvvv
rrrrrrccccccvvvv