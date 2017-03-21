'use strict';

import React from 'react';

import cssStyles from './mine-field.styl';
import Cell from './Cell.jsx';

function cellType(cellValue) {
    switch (cellValue) {
        case null: return 'cut';
        case -1: return 'mine';
        case 1: return 'one';
        case 2: return 'two';
        case 7: return 'empty';
    }
}

export default function MineField(props) {
    return (
        <table className={cssStyles.mineField}>
            <tbody>
                {props.field.map((fieldRow, row) =>
                    (<tr key={row}>
                        {
                            fieldRow.map((cellValue, col) => <Cell
                                key={row + '.' + col}
                                onClick={() => props.onCellClick(row, col)} 
                                value={cellValue}
                                cellType={cellType(cellValue)}/>)
                        }
                    </tr>))}
            </tbody>
        </table>
    );
}
