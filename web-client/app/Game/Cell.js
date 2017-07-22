import React from 'react';

import styles from './cell.styl';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { flagged: false };
    }

    _onRightClick = event => {
        event.preventDefault();
        this.setState({ flagged: !this.state.flagged });
    }

    _onLeftClick = () => {
        this.setState({ flagged: false });
        this.props.onClick();
    }

    render() {
        return (
            <td
                onClick={this._onLeftClick}
                onContextMenu={this._onRightClick}
                className={(this.state.flagged ? styles.flagged : '') + ' ' + styles.cell + ' ' + styles[this.props.cellType]}
            >
                <span className={styles.text}>{this.props.value <= 0 ? '' : this.props.value}</span>
            </td>
        );
    }
}
