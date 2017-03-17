'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import cellStyles from './styles/cell.styl';

export function Cell(props) {
    return (<li className={cellStyles.cell + ' ' + cellStyles[props.cellType]}><a href="#" className={cellStyles[props.cellType]}></a></li>);
}