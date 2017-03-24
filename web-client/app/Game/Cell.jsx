'use strict';

import React, { Component } from 'react';

import styles from './cell.styl';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { flagged: false };
    }

    onRightClick(event) {
        event.preventDefault();
        this.setState({ flagged: !this.state.flagged });
    }

    onLeftClick() {
        this.setState({ flagged: false });
        this.props.onClick();
    }

    render() {
        return (
            <td onClick={this.onLeftClick.bind(this)} onContextMenu={this.onRightClick.bind(this)} className={(this.state.flagged ? styles.flagged : '') + ' ' + styles.cell + ' ' + styles[this.props.cellType]}>
                <span className={styles.text}>{this.props.value <= 0 ? '' : this.props.value}</span>
            </td>
        );
    }
}
