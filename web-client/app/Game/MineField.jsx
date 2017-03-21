'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import cssStyles from './mine-field.styl';
import Cell from './Cell.jsx';

function cellType(cellValue) {
    switch (cellValue) {
        case null: return 'cut';
        case -1: return 'mine';
        case 0: return 'empty';
        case 1: return 'one';
        case 2: return 'two';
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