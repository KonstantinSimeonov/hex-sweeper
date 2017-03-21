'use strict';

import React, { Component } from 'react';

import io from '../../node_modules/socket.io-client/dist/socket.io.min.js'

import { get as httpGet, post as httpPost } from '../utils/json-requester.js';
import generateField from '../../../shared/generate-field.js';

import MineField from './MineField.jsx';

import styles from './game.styl';

export default class Game extends Component {
    constructor(props) {
        super(props);

        const urlQuery = new URLSearchParams(props.location.search),
            fieldSize = +urlQuery.get('fieldSize'),
            minesCount = +urlQuery.get('minesCount'),
            spectatable = urlQuery.get('spectatable'),
            field = generateField({
                getCell() { return 0; },
                getNullCell() { return null; }
            }, fieldSize);

        this.state = { field };

        const socket = this.socket = io('http://localhost:6969', { transports: ['websocket'] }),
            token = localStorage.getItem('token');

        socket.on('updates', this.onUpdates.bind(this));
        socket.emit('initGame', { fieldSize, minesCount, spectatable, token });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    onPlayerMove(row, col) {
        this.socket.emit('move', { row, col });
    }

    onCellMarker(row, col) {
        this.socket.emit('mark', { row, col });
    }

    onUpdates(updates) {
        const updatedRows = [];

        for (const { row, col, value } of updates) {
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
            <MineField field={this.state.field} onCellClick={this.onPlayerMove.bind(this)} />
        </div>);
    }
}
