import React from 'react';
import { func, arrayOf, number } from 'prop-types';

import cssStyles from './mine-field.styl';
import Cell from './Cell';

function cellType(cellValue) {
    switch (cellValue) {
        case null: return 'cut';
        case -1: return 'mine';
        case 1: return 'one';
        case 2: return 'two';
        case 7: return 'empty';
    }
}

export default class MineField extends React.Component {
    static propTypes = {
        field: arrayOf(arrayOf(number).isRequired).isRequired,
        onCellClick: func.isRequired,
        rightClick: func
    }

    render() {
        const { field, onCellClick, rightClick } = this.props;

        if (!field) {
            return <div></div>;
        }

        return (
            <table className={cssStyles.mineField}>
                <tbody>
                    {
                        field.map((fieldRow, row) =>
                            (
                                <tr key={row}>
                                    {
                                        fieldRow.map((cellValue, col) => <Cell
                                            key={row + '.' + col}
                                            coords={row + '.' + col}
                                            onClick={() => onCellClick(row, col)}
                                            value={cellValue}
                                            cellType={cellType(cellValue)} />)
                                    }
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        );

    }
}
