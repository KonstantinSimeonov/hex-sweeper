'use strict';

import React from 'react';

import cellStyles from './cell.styl';

export default function Cell(props) {
    return (
        <td onClick={props.onClick} className={cellStyles.cell + ' ' + cellStyles[props.cellType]}>
            <span className={cellStyles.text}>{props.value <= 0 ? '' : props.value}</span>
        </td>
    );
}
