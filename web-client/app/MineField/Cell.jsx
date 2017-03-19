'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import cellStyles from './cell.styl';

export default function Cell(props) {
    return (<li onClick={props.onClick} className={cellStyles.cell + ' ' + cellStyles[props.cellType]}>
        <span className={cellStyles.text}>{props.value}</span>
    </li>);
}