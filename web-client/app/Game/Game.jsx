'use strict';

import React, { Component } from 'react';

import io from '../../node_modules/socket.io-client/dist/socket.io.min.js'

import { get as httpGet, post as httpPost } from '../utils/json-requester.js';
import generateField from '../../../shared/generate-field.js';

import MineField from './MineField.jsx';
import Timer from '../Timer/Timer.jsx';

import styles from './game.styl';

function bin(n) {
    let res = '';

    do {
        res = (n & 1) + res;
        n >>>= 1;
    } while(n !== 0);

    return res;
}

const rowMask = (1 << 17) - 1,
    colMask = (1 << 10) - 1,
    valueMask = (1 << 4) - 1;

console.log(bin(rowMask), bin(colMask), bin(valueMask));
console.log(rowMask, colMask, valueMask);

export default class Game extends Component {
    static deserializeCellUpdate(cellUpdate) {
        return [(cellUpdate & rowMask) >> 11, (cellUpdate & colMask) >> 4, cellUpdate & valueMask];
    }

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

        const token = localStorage.getItem('token'),
            socket = this.socket = io('http://localhost:6969', { transports: ['websocket'], query: { token } });
            console.log(token);
        socket.on('updates', this.onUpdates.bind(this));
        socket.on('save:success', () => console.log('bez tvar'));
        socket.on('win', () => console.log('i wonz'));
        // socket.emit('initGame', { fieldSize, minesCount, spectatable });
        socket.emit('load');
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

    onSaveClick() {
        this.socket.emit('save');
    }

    onUpdates(updates) {
        const updatedRows = [];

        for (const serializedUpdate of updates) {
            const [row, col, value] = Game.deserializeCellUpdate(serializedUpdate);
            console.log(row, col, value, serializedUpdate);
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
                {localStorage.getItem('token') ? <a className="custom-btn" onClick={this.onSaveClick.bind(this)}>Save</a> : ''}
            </div>
            <MineField field={this.state.field} onCellClick={this.onPlayerMove.bind(this)} />
        </div>);
    }
}
