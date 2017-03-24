'use strict';

export default function countCellsInHexagon(hexagonSize) {
    const n = hexagonSize,
        result = (2 * (n - 1) * n) + (n - 2) * (n - 1) + 2 * n - 1;
    return result;
}
