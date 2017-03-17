'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import cssStyles from './styles/mine-field.styl';
import { Cell } from './Cell.jsx';

function cellType(cellValue) {
    console.log(cellValue);
    switch(cellValue) {
        case null: return 'cut';
        case -1: return 'mine';
        case 0: return 'empty';
        case 1: return 'one';
        case 2: return 'two';
    }
}

export function MineField(props) {
    

    return (<div className={cssStyles.mineField}>
        {props.field.map((fieldRow, row) => 
        (<ul key={row}>{fieldRow.map((cellValue, col) => <Cell key={row + ';' + col} value={cellValue} cellType={cellType(cellValue)}/>)}</ul>))}
    </div>);
}