'use strict';

import React, { Component } from 'react';
import io from '../../node_modules/socket.io-client/dist/socket.io.min.js'

import { get as httpGet, post as httpPost } from '../utils/json-requester.js';

import MineField from './MineField.jsx';
import Timer from '../Timer/Timer.jsx';

import styles from './game.styl';

const rowMask = (1 << 17) - 1,
    colMask = (1 << 10) - 1,
    valueMask = (1 << 4) - 1;

export default class Game extends Component {
    // TODO: shared code? 
    static deserializeCellUpdate(cellUpdate) {
        return [(cellUpdate & rowMask) >> 11, (cellUpdate & colMask) >> 4, cellUpdate & valueMask];
    }

    constructor(props) {
        super(props);

        this.state = { field: [], saveBtnClass: '' };
    }

    connect(options = {}) {
        const token = localStorage.getItem('token');
        options.token = token;

        this.socket = io('http://localhost:6969', { transports: ['websocket'], query: options });
        this.socket
            .on('idAssigned', token => localStorage.setItem('token', token))
            .on('updates', this.onUpdates.bind(this))
            .on('win', this.onWin.bind(this))
            .on('gameover', () => alert('lun'));
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    onWin() {
        alert('win');
    }

    /**
     * Update only the rows which contain an update.
     * Executed on socket event emitted from the server.
     */
    onUpdates(updates) {
        const updatedRows = [];

        for (const serializedUpdate of updates) {
            const [row, col, value] = Game.deserializeCellUpdate(serializedUpdate);
            if (!updatedRows[row]) {
                updatedRows[row] = this.state.field[row].slice();
            }

            updatedRows[row][col] = value;
        }

        for (let i = 0, length = this.state.field.length; i < length; i += 1) {
            if (!updatedRows[i]) {
                updatedRows[i] = this.state.field[i];
            }
        }

        this.setState({ field: updatedRows });
    }

    render() {
        return (<div className={styles.gameContainer}>
            <div>
                <Timer />
                {localStorage.getItem('token') ? <a className={`custom-btn ${styles.saveBtn} ${this.state.saveBtnClass}`} onClick={this.onSaveClick.bind(this)}>Save</a> : ''}
            </div>
            <MineField field={this.state.field} onCellClick={this.onPlayerMove ? this.onPlayerMove.bind(this) : ''} />
        </div>);
    }
}
